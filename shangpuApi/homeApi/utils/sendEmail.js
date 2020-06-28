// 发送邮 件的模块

  // 引入第三方模块
  const nodemailer = require("nodemailer");
  //创建发送邮件的对象
  let transporter = nodemailer.createTransport({
    host: "smtp.qq.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: '202238452@qq.com', // 发送方邮箱账号
      pass: 'nhokjnxuvqahcafe' // 邮箱的授权码
    }
  });

  function send(mail,code){
    // 邮件的内容
    let content ={
      from: '"Fred Foo 👻" <202238452@qq.com>', // sender address
      to: `${mail}`, // list of receivers
      subject: "注册验证码", // Subject line
      
      html: `<b>欢迎注册Bear的测试项目，您的验证码是${code}</b>` // html body
    }

    
      let desc = transporter.sendMail(content,(err,infos)=>{
       if(err){
         return err
       }else{
         return infos
       }
      });
      return desc
  }
 
  module.exports={send}