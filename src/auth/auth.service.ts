import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { createHash, hash, randomBytes, randomInt } from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthToken } from 'src/Entities/authToken.entity';
import { Session } from 'src/Entities/session.entity';

import { Repository } from 'typeorm';
import { MailService } from 'src/mail/mail.service';
@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UserService)) private readonly userService: UserService,
        @Inject(forwardRef(() => MailService)) private readonly mailService: MailService,

        @InjectRepository(AuthToken)
        private authTokenRepository: Repository<AuthToken>,

        @InjectRepository(Session)
        private sessionRepository: Repository<Session>
    ){}


    private createRawOTP(){
    // Generate a cryptographically secure random integer between 100000 (inclusive) and 1000000 (exclusive).
    const otp = randomInt(100000, 1000000);
    
    // Return the OTP as a string
    return otp.toString();
    }

    private createHashedOTP(rawOTP: string){
        return createHash('sha256').update(rawOTP).digest('hex')
    }

    private createMagicLink(rawtoken: string){
        return `http://localhost:${process.env.PORT}/api/auth/verify?token=${rawtoken}`;
    }

    
    public async login(email: string){
        const existingEmail = await this.userService.findByEmail(email)
        if(!existingEmail)
            throw new Error("User not exist")

        const rawOTP = this.createRawOTP()
        const hashedOTP = this.createHashedOTP(rawOTP)
        // const magicLink = this.createMagicLink(rawToken)

        await this.authTokenRepository.save({
            token: hashedOTP,
            type: 'LOGIN' as any,
            userId: existingEmail.id,
            expiresAt: new Date(Date.now() + 15 * 60 * 1000)
        })

        await this.mailService.sendOTP(email, rawOTP)

        return {message:"OTP sent"}
    }

    private async getToken(token: string){
        return this.authTokenRepository.findOne({where:{token: token}})
    }

    public async verify(otp: string){
        const hashedOTP = this.createHashedOTP(otp)
        const existingOTP = await this.getToken(hashedOTP)
        if(!existingOTP || existingOTP.usedAt || existingOTP.expiresAt < new Date())
            throw new Error('Invalid or expired token')

        const session = await this.sessionRepository.save({
            userId: existingOTP.userId,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        })

        await this.authTokenRepository.update(
            existingOTP.id, 
            {usedAt: new Date()}
        );
        return session.id
    }
}
