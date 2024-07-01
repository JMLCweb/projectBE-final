const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let mailOptions = {
    from: `"JMLCweb" <${process.env.EMAIL_USER}>`,
    to: to,
    subject: subject,
    text: text,
  };

  let info = await transporter.sendMail(mailOptions);

  console.log('Message sent: %s', info.messageId);
};

module.exports = sendEmail;
