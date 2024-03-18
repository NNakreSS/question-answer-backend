import nodemailer from "nodemailer";

const sendEmail = async (mailOptions) => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;
  let transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT),
    auth: {
      user: SMTP_USER, // generated ethereal user
      pass: SMTP_PASSWORD, // generated ethereal password
    },
  });

  let info = await transporter.sendMail(mailOptions);
  console.log("Message sent: %s", info.messageId);
};

export default sendEmail;
