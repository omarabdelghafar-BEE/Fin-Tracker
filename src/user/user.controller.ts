import { Body, Controller, DefaultValuePipe, Get, Param, ParseBoolPipe, ParseIntPipe, Patch, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import {CreateUserDto} from './DTOs/createUserDto'
import { SessionAuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/Entities/enums/Roles.enum';
import { User } from 'src/Entities/user.entity';
import { CurrentUser } from 'src/auth/decorators/currentUser.decorator';
import { ApiConsumes, ApiOperation } from '@nestjs/swagger';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @UseGuards(SessionAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    async getAll(){
        try{
            const users = await this.userService.getAllUsers()
            return users
        }catch(error){
            return new Error(error)
        }
    }

    @Get('Get_Me')
    @UseGuards(SessionAuthGuard)
    @Roles(Role.ADMIN, Role.USER)
    async myInfo(@CurrentUser() user: User) {
    return this.userService.getMe(user.id);
    }


    @Post('register')
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiOperation({ summary: 'Fill your data' })
    async createUser(@Body() user: CreateUserDto){
        try{
            const newUser = await this.userService.register(user)
            return newUser
        }catch(error){
            return new Error(error)
        }
    }
}
