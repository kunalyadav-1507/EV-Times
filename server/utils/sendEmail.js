const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({

  host: "smtp.gmail.com",

  port: 587,

  secure: false,

    family: 4,


  auth: {

    user: process.env.EMAIL_USER,

    pass: process.env.EMAIL_PASS

  }

});

const sendEmail = async (to, subject, text) => {

  try {

    await transporter.sendMail({

      from: `"EV Times" <${process.env.EMAIL_USER}>`,

      to,

      subject,

      text

    });

    console.log("Email Sent Successfully");

  }

  catch (error) {

    console.log("Email Error:", error);

    throw error;

  }

};

module.exports = sendEmail;