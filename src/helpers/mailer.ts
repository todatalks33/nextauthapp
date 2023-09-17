import User from '@/models/userModel'
import nodemailer from 'nodemailer'

import bcryptjs from 'bcryptjs'

export const sendEmail = async ({email,emailType,userId}:any)=>{
    try {
        //create a hashed token
        const hashedToken = await bcryptjs.hash (userId.toString(),10)
        if(emailType==='VERIFY'){
            await User.findByIdAndUpdate(userId,{verifyToken:hashedToken,verifyTokenExpiry:Date.now()+3600000})
        }else if(emailType === 'RESET'){
            await User.findByIdAndUpdate(userId,{forgotPasswordToken:hashedToken,forgotPasswordTokenExpiry:Date.now()+3600000})
        }


        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "0e16453598d139",
              pass: "de19acd1a54454"
            }
          });
          

          const mailOptions={
            from:"monawwarazal@gmail.com",
            to:email,
            subject:emailType === "VERIFY"?'verify your email':"Reset your password",
            html:`<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType==="VERIFY"?"verify your email":"reset your password"}</p>`,
          }
          const mailresponse = await transport.sendMail(mailOptions)
          return mailresponse;
    } catch (error:any) {
        throw new Error(error.message)
    }
}
