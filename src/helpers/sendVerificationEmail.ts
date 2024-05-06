import { ApiResponse } from '@/types/ApiResponse';
import nodemailer from 'nodemailer'


export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {

      let transporter = nodemailer.createTransport({
          host: process.env.MAIL_HOST,
          port: 587,
          secure: false,
          auth: {
              user: process.env.MAIL_USER,
              pass: process.env.MAIL_PASS
          }
      })

      let info = await transporter.sendMail({
          from:  process.env.MAIL_USER,
          to: `${email}`,
          subject: `Verify your code`,
          html: `<p>Your verification code is  ${verifyCode}</p>`,
      })
      console.log('Sent mail info ', info);

    return { success: true, message: 'Verification email sent successfully.' };
  } catch (emailError) {
    console.error('Error sending verification email:', emailError);
    return { success: false, message: 'Failed to send verification email.' };
  }
}