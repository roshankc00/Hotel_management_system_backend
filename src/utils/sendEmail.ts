import nodemailer from 'nodemailer'
import env from './validateEnv'
export interface options {
    email:string,
    subject:string,
    message:string
}


const sendEmail=async(options:options)=>{
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user:env.SMTP_USER,
          pass:env.SMTP_PASSWORD
        }
      });
  const mailOption={
    from:env.MAIL_SENDER,
    to:options.email,
    subject:options.subject,
    text:options.message
  }
  await transporter.sendMail(mailOption)
} 
export default sendEmail

