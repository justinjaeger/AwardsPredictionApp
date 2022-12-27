/**
 * RECURRING INVOCATION: Every 10 minutes (modify with "amplify update function")
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`); // https://docs.amplify.aws/cli/graphql/custom-business-logic/#structure-of-the-function-event
  return {
    statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origien": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
    body: JSON.stringify('Hello from Lambda!'),
  };
};
