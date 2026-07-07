const { BrevoClient } = require("@getbrevo/brevo");

const brevo = new BrevoClient({

  apiKey: process.env.BREVO_API_KEY,

});

const sendEmail = async (to, subject, text) => {

  try {

    await brevo.transactionalEmails.sendTransacEmail({

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

    });

    console.log("✅ Email Sent Successfully");

  }

  catch (error) {

    console.log("❌ Brevo Error:");

    console.log(error);

    throw error;

  }

};

module.exports = sendEmail;