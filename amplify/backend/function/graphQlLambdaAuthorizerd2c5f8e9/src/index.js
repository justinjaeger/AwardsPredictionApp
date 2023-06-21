// https://docs.amplify.aws/cli/graphql/authorization-rules/#custom-authorization-rule
// https://docs.amplify.aws/cli/function/#utilizing-lambda-function-template-iam-authorization
const jwt = require('jsonwebtoken');

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 * @type {import('node-fetch').RequestInit}
 */
/**
 * This is an OR layer attached to models
 * Users will only have the ability to update and create on certain things so this is going to say
 * If we can verify this auth token AND the user is the owner of the thing they are trying to update, allow it
 * OR If this authenticated user is an admin, allow it
 */
const ADMIN_USER_IDS = [
  '420f68ea-03ec-4d67-8bb2-99fd1bfe5210', // dev
  'b16842a5-43d7-41a4-b544-1d32c2068247', // prod
];

const DENIED_OPERATIONS = ['DeleteUser'];

exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const {
    authorizationToken, // sent from the client
    requestContext: {
      // https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
      apiId, // AppSync API ID
      accountId, // AWS Account ID
      queryString, // example: "mutation CreateEvent {...}\n\nquery MyQuery {...}\n", # GraphQL query
      operationName, // example: "MyQuery", # GraphQL operation name
      variables, // example: {} # any additional variables supplied to the operation
    },
  } = event;

  const unauthorizedResponse = {
    // required
    isAuthorized: false,
    resolverContext: {
      hello: 'hi', // just to test what this is
    },
  };

  let isAuthorized = false;
  // WHAT IF we verify the token on the CLIENT SIDE first so we can make sure it's not expired
  // so if the JWT fails or is expired, we know it's an actual error and don't need to handle it here
  if (!authorizationToken) {
    // just return with this being false
    return unauthorizedResponse;
  }

  let userId = null;

  // verify the token
  try {
    const decodedJwt = jwt.verify(authorizationToken, process.env.JWT_SECRET);
    userId = decodedJwt.userId;
    if (!userId) {
      return unauthorizedResponse;
    }
  } catch (err) {
    // NOTE: we catch / refresh expired tokens on the client side,
    // so we don't need to handle that here. If the token is expired, auth should simply fail
    return unauthorizedResponse;
  }

  // if user is admin, let them do anything. When userId is defined it means the JWT is valid so can trust it
  if (ADMIN_USER_IDS.includes(userId)) {
    isAuthorized = true;
  }

  // don't let any non-admin user do these even to their own data
  if (DENIED_OPERATIONS.includes(operationName)) {
    return unauthorizedResponse;
  }

  /**
   * Only authorize if user is attempting to mutate their own data:
   * Case: UpdateUser
   * - the "id" passed as a param has to match userId
   * Case: UpdateOrDeleteOrCreateRelationship
   * - the "followingUserId" passed as a param has to match userId
   * Case: UpdateOrDeleteAnythingElse
   * - the "userId" passed as a param has to match userId
   */
  // TODO: Figure out how to actually implement this
  const userIdMatchesRequest = JSON.stringify(variables).includes(userId); // TODO: hacky

  if (userIdMatchesRequest) {
    isAuthorized = true;
  }

  const response = {
    // required
    isAuthorized,
    resolverContext: {
      hello: 'hi', // just to test what this is
    },
  };
  console.log('response >', JSON.stringify(response, null, 2));
  return response;
};
