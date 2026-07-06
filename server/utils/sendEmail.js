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

  console.log("Verifying SMTP...");
  console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);

  await transporter.verify();

  console.log("SMTP Verified");

  await transporter.sendMail({

    from: `"EV Times" <${process.env.EMAIL_USER}>`,

    to,

    subject,

    text

  });

  console.log("Email Sent Successfully");

};

module.exports = sendEmail;