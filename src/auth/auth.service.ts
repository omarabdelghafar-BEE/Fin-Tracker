import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { createHash, hash, randomBytes } from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthToken } from 'src/Entities/authToken.entity';
import { Session } from 'src/Entities/session.entity';

import { MaxKey, Repository } from 'typeorm';
import { ESLint } from 'eslint';
@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UserService)) private readonly userService: UserService,

        @InjectRepository(AuthToken)
        private authTokenRepository: Repository<AuthToken>,

        @InjectRepository(Session)
        private sessionRepository: Repository<Session>
    ){}


    private createRawToken(){
        return randomBytes(32).toString('hex')
    }

    private createHashedToken(rawToken: string){
        return createHash('sha256').update(rawToken).digest('hex')
    }

    private createMagicLink(rawtoken: string){
        return `http://localhost:${process.env.PORT}/api/auth/verify?token=${rawtoken}`;
    }

    
    public async login(email: string){
        const existingEmail = await this.userService.findByEmail(email)
        if(!existingEmail)
            throw new Error("User not exist")

        const rawToken = this.createRawToken()
        const hashedToken = this.createHashedToken(rawToken)
        const magicLink = this.createMagicLink(rawToken)

        await this.authTokenRepository.save({
            token: hashedToken,
            type: 'LOGIN' as any,
            userId: existingEmail.id,
            expiresAt: new Date(Date.now() + 15 * 60 * 1000)
        })

        return magicLink
    }

    private async getToken(token: string){
        return this.authTokenRepository.findOne({where:{token: token}})
    }

    public async verify(token: string){
        const hashedtoken = this.createHashedToken(token)
        const existingToken = await this.getToken(hashedtoken)
        if(!existingToken || existingToken.usedAt || existingToken.expiresAt < new Date())
            throw new Error('Invalid or expired token')

        const session = await this.sessionRepository.save({
            userId: existingToken.userId,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        })

        await this.authTokenRepository.update(
            existingToken.id, 
            {usedAt: new Date()}
        );
        return session.id
    }
}
