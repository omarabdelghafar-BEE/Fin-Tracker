import { BadRequestException, Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './DTOs/loginDto';
import { VerifyDto } from './DTOs/verifyDto';
import { ApiConsumes, ApiOperation } from '@nestjs/swagger';
import express from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('login')
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiOperation({ summary: 'Enter your email' })
    async login(@Body() loginDto: LoginDto){
        try{
            const loginProcess = await this.authService.login(loginDto.email)
            return loginProcess
        }catch(error){
            throw new BadRequestException(error.message)
        }
    }

    @Post('verify')
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiOperation({ summary: 'Enter your token' })
    async verify(@Body() verifyDto: VerifyDto, @Res({ passthrough: true }) res: express.Response) {
    try {
        const sessionId = await this.authService.verify(verifyDto.token);

        res.cookie('sessionId', sessionId, {
        httpOnly: true,
        secure: false, // true in production (https)
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return { message: 'Logged in successfully' };

    } catch (error) {
        throw new BadRequestException(error.message);
    }
    }

}
