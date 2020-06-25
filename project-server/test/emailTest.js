const { sendEmail } = require("../utils/email");

async function test() {
  await sendEmail('15637711888@163.com', {
    subject: `邮件测试`,
    html: `<html><body>
        <h2>收到即表示成功</h2>
      <body></html>`,
  });
  console.log('运行到这里说明成功了');
}

test();