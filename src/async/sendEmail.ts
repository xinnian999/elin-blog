import nodemailer from "nodemailer";

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.qq.com",
    port: 465,
    secure: true, // 使用 SSL
    auth: {
      user: "3307578337@qq.com",
      pass: "sefenhrhbimgcjec", // SMTP授权码
    },
  });

  const mailOptions = {
    from: '"Elin" <3307578337@qq.com>',
    subject: "【Elin's Blog】通知",
    to,
    html,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log("发送失败:", error);
    }
    console.log("邮件发送成功:", info.response);
  });
};

export default sendEmail;
