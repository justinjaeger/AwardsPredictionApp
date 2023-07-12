// https://docs.amplify.aws/cli/graphql/authorization-rules/#custom-authorization-rule
// https://docs.amplify.aws/cli/function/#utilizing-lambda-function-template-iam-authorization
const crypto = require('crypto');

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 * @type {import('node-fetch').RequestInit}
 */
/**
 * This is an OR layer attached to models
 * Users will only have the ability to update and create on certain things so this is going to say
 * If we can verify this auth token AND the user is the owner of the thing they are trying to update, allow it
 * OR If this authenticated user is an admin, allow it
 * Note: For delete operations to be valid, in addition to the id of the item being deleted, it must also include the userId of the authenticated user passed as a "condition"
 * this includes: relationships, tokens, predictionSets, predictions, historyPredictionSets, historyPredictions
 */

const ADMIN_USER_IDS = [
  '420f68ea-03ec-4d67-8bb2-99fd1bfe5210', // dev
  'b16842a5-43d7-41a4-b544-1d32c2068247', // prod
];
const DENIED_OPERATIONS = ['deleteUser']; // anything that the user can't do to their own data
const VALID_TOKEN_QUERIES = ['tokenByToken'];
const RELATIONSHIP_MUTATIONS = [
  'createRelationship',
  'updateRelationship',
  'deleteRelationship',
];
const VALID_USER_MUTATIONS = ['updateUser'];

function decodeBase64(str) {
  return Buffer.from(str, 'base64').toString('binary');
}

/* Takes head and body encoded as base64
 * and return a hash(head + "." + body,secret)
 */
function checkSumGen(head, body, secret) {
  const checkSumStr = head + '.' + body;
  // @ts-ignore
  const hash = crypto.createHmac('sha256', secret);
  const checkSum = hash.update(checkSumStr).digest('base64').toString('utf8');
  console.log('checkSumm', checkSum);
  return checkSum;
}

/**
 * takes a JWT string, parses the head and payload
 * computes the signature, compares if the two signatures are equal
 * verifies if is expired
 * return the payload as an object, or undefined if invalid
 */
const decode = (str, secret) => {
  const jwtArr = str.split('.');
  const head = jwtArr[0];
  const body = jwtArr[1];
  const hash = jwtArr[2];
  const checkSum = checkSumGen(head, body, secret);

  if (hash === checkSum) {
    console.log('JWT authenticated!');
    const decoded = JSON.parse(decodeBase64(body));
    // verify if JWT is expired, if exp is a field on it
    // @ts-ignore
    const { exp } = decoded || {};
    const now = new Date().getTime();
    if (exp && now > exp) {
      console.log('JWT expired');
      return undefined;
    }
    return decoded;
  } else {
    console.log('JWT NOT authenticated');
    return undefined;
  }
};

// right now, handling the expired token on the client side so it always expect tokent to be fresh
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const {
    authorizationToken, // sent from the client
    requestContext: {
      // https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
      // apiId, // AppSync API ID
      // accountId, // AWS Account ID
      queryString, // example: "mutation MyMutation {\n  updateUser(input: {id: \"xxx\", name: \"new name\"}) {\n    id\n    name\n  }\n}\n", # GraphQL query
      // operationName, // example: "MyQuery", # GraphQL operation name
      // variables, // example: {} # any additional variables supplied to the operation
    },
  } = event;

  const unauthorizedResponse = {
    isAuthorized: false,
    resolverContext: {},
  };
  const authorizedResponse = {
    isAuthorized: true,
    resolverContext: {},
  };

  if (!authorizationToken) {
    console.log('no token passed');
    return unauthorizedResponse;
  }

  let userId = null;
  let isRefreshToken = false;

  // verify the token
  try {
    const decodedJwt = decode(authorizationToken, process.env.JWT_SECRET);
    console.log('decodedJwt', decodedJwt);
    if (!decodedJwt) {
      return unauthorizedResponse;
    }
    userId = decodedJwt.userId;
    if (!userId) {
      console.log('no userId in jwt');
      return unauthorizedResponse;
    }

    isRefreshToken = decodedJwt.isRefreshToken === true;
    console.log('isRefreshToken', isRefreshToken);
  } catch (err) {
    // Note: we catch / refresh expired tokens on the client side,
    // so we don't need to handle that here. If the token is expired, auth should simply fail.
    // We might want to change this later though.
    console.error('error verifying jwt', err);
    return unauthorizedResponse;
  }

  // if user is admin, let them do anything
  const isAdmin = ADMIN_USER_IDS.find((id) => id === userId);
  if (isAdmin) {
    console.log('is admin!! authorizing...');
    return authorizedResponse;
  }

  // don't let any user do these even to their own data
  const isDeniedOperation = DENIED_OPERATIONS.find((deniedOp) =>
    queryString.includes(deniedOp),
  );
  if (isDeniedOperation) {
    console.log('operation denied');
    return unauthorizedResponse;
  }

  /**
   * TOKEN OPERATIONS
   * Token queries will fail unless they pass the userId in the query string, as with "get all user's tokens" and "delete token by id" (where condition is passed)
   * The exception is refresh tokens, which are allowed to do a tokenByToken query, and nothing else
   * This makes refresh tokens unusable to hackers for everything except verifying themselves
   */
  const isValidRefreshTokenQuery = VALID_TOKEN_QUERIES.find((q) =>
    queryString.includes(q),
  );
  if (isValidRefreshTokenQuery) {
    console.log('is valid refresh token query');
    return authorizedResponse;
  }
  // refresh token should be useless except for the conditions above, and we'd only hit this if token query wasn't valid
  if (isRefreshToken) {
    console.log('is refresh token but the query is not valid');
    return unauthorizedResponse;
  }

  /**
   * Only accept mutations where a user is trying to mutate their own data, across all tables (queries are generally allowed, except with tokens)
   * We REQUIRE the queryString to include the auth user's userId. But there are 2 special cases:
   * - isRelationship, in which case auth user is passed as followingUserId
   * - isUserMutation, in which case auth user is passed as id
   */
  const isRelationship = RELATIONSHIP_MUTATIONS.find((m) => queryString.includes(m));
  const isUserMutation = VALID_USER_MUTATIONS.find((m) => queryString.includes(m));
  let fieldWithAuthUserId = 'userId';
  if (isRelationship) {
    fieldWithAuthUserId = 'followingUserId';
  } else if (isUserMutation) {
    fieldWithAuthUserId = 'id';
  }
  const isModifyingSelf =
    queryString.includes(`${fieldWithAuthUserId}: \"${userId}`) ||
    queryString.includes(`(condition: {${fieldWithAuthUserId}: {eq: \"${userId}"}})`); // in the case of a delete, which otherwise only requires the id of the item being deleted
  console.log('isModifyingSelf', isModifyingSelf);
  if (!isModifyingSelf) {
    return unauthorizedResponse;
  }

  return authorizedResponse;
};
