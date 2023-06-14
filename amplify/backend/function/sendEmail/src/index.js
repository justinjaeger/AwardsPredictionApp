const sgMail = require('@sendgrid/mail');

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

exports.handler = async (event) => {
  // Probably won't need this bc the console logs just work
  //   const binArrayToJson = (binArray) => {
  //     let str = '';
  //     for (let i = 0; i < binArray.length; i++) {
  //       str += String.fromCharCode(parseInt(binArray[i]));
  //     }
  //     return JSON.parse(str);
  //   };

  const email = event.email;
  console.log(`EVENT: ${JSON.stringify(event)}`);
  console.log('EMAIL:', event.email);

  const SENDER = 'noreply@oscarexpert.com';

  const generateCode = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  const code = generateCode();
  const msg = {
    to: email, // Change to your recipient
    from: SENDER, // Change to your verified sender
    subject: 'Award Expert - Confirm your email',
    text: `Your confirmation code is ${code}`,
  };

  // TODO: Figure out how to get this from the environment variables
  sgMail.setApiKey(SENDGRID_API_KEY); // important

  try {
    sgMail.send(msg);
    console.error('Confirmation code sent!');
    // return { status: 'success' };
  } catch (error) {
    console.error('error sending confirmation code:', error);
    // return { status: 'error' };
  }

  return {
    statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
    body: JSON.stringify('Hello from Lambda!'),
  };
};
