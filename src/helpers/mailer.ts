import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({email, emailType, userId}:any) => {
    try {
        //create hash token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if(emailType === 'VERIFY'){
            await User.findByIdAndUpdate(userId,
                {verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000})
        }else if (emailType === 'RESET'){
            await User.findByIdAndUpdate(userId,
                {forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000})
        }

        var transport = nodemailer.createTransport({ 
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                  user: "7d9f89a8c547b1",
                  pass: "3ff88617a57980"
                }
        });

        const mailOptions = {
            from: 'sanket@gamil.com',
            to: email,
            subject: emailType === "VERIFY" ? `Please Verify your Email` : `Reset Your Password`,
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> 
                to ${emailType === 'VERIFY' ? "verify your email" : "reset your password"}</p>`
        }

        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse

    } catch (error:any) {
        throw new Error(error.message);
    }
}