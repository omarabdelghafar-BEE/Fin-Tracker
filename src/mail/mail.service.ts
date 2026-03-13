import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';
@Injectable()
export class MailService {
    private transporter: Transporter;
    constructor(){
        this.transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST, // e.g., smtp.gmail.com
            port: Number(process.env.MAIL_PORT), // 465 (SSL) or 587 (TLS)
            secure: process.env.MAIL_PORT === '465', // true for 465, false for other ports
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        })
    }

    async sendOTP(email: string, otp: string){
        await this.transporter.sendMail({
            from: `Fin Tracker ${process.env.MAIL_USER}`,
            to: email,
            subject: 'Your login OTP',
            text: `Your OTP is ${otp}`,
            html: `<h2>Your OTP is ${otp}</h2><p>This code expires in 15 minutes</p>`
        })
    }

}
