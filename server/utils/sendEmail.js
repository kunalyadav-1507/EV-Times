const brevo = require("@getbrevo/brevo");

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(

  brevo.TransactionalEmailsApiApiKeys.apiKey,

  process.env.BREVO_API_KEY

);

const sendEmail = async (to, subject, text) => {

  try {

    const email = {

      sender: {

        name: "EV Times",

        email: "raokunal.ky1234@gmail.com"

      },

      to: [

        {

          email: to

        }

      ],

      subject,

      textContent: text

    };

    await apiInstance.sendTransacEmail(email);

    console.log("Email Sent Successfully");

  }

  catch (error) {

    console.log("Brevo Error:");

    console.log(error.response?.body || error);

    throw error;

  }

};

module.exports = sendEmail;