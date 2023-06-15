const sgMail = require('@sendgrid/mail');

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

exports.handler = async (event) => {
  // TODO: Import as env variable
  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

  sgMail.setApiKey(SENDGRID_API_KEY); // important

  const email = event.email;
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

  try {
    await sgMail.send(msg);
    console.log('Confirmation code sent!');
    return {
      statusCode: 200,
      body: JSON.stringify({ status: 'success' }),
    };
  } catch (error) {
    console.error('Error sending confirmation code:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ status: 'error' }),
    };
  }
};
