import nodemailer from 'nodemailer';

export const sendOtpEmail = async(email,otp)=>{
   //transporter
   const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.SMTP_EMAIL,
        pass:process.env.SMTP_PASSWORD,
    }
   })
   const mailOptions ={
    from:"sharmavarunfake2066@gmail.com",
    to:email,
    subject:"your otp code",
    html:`<h3>oyee chutiye le pakad tera otp :<b>${otp}</b></h3>`
   };
    transporter.sendMail(mailOptions,(err,info)=>{
    if(err){
        console.log("error")
    }
    else{
        console.log("response",info.response);
    }
   });
 console.log("otp sent success",otp);

}
