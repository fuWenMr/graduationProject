const nodemailer = require("nodemailer");
const { emailConfig } = require("../config");

/**
 *  发送邮件
 * @param {srting} to
 * @param {object} extraOptions {subject,text?,html?}
 */
function sendEmail(to, extraOptions) {
  const transporter = nodemailer.createTransport({
    host: emailConfig.host,
    service: emailConfig.service,
    port: 465,
    secureConnection: true,
    auth: {
      user: emailConfig.user,
      pass: emailConfig.authorization,
    },
  });

  const mailOptions = {
    to,
    from: `<${emailConfig.user}>`,
    ...extraOptions,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        reject(error);
      }
      transporter.close();
      resolve(info);
    });
  });
}

module.exports = {
  sendEmail,
};
