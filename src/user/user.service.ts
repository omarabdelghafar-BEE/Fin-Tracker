import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './DTOs/createUserDto';
import { AuthService } from 'src/auth/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Entities/user.entity';
import { Repository } from 'typeorm';
import { createHash, randomBytes } from 'crypto';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}

    public async findByEmail(email: string){
        return this.userRepository.findOne({where: {email: email.toLowerCase()}})
    }

    private async findByUsername(username: string){
        return this.userRepository.findOne({where: {username: username}})
    }

    public async getAllUsers(){
        const users = await this.userRepository.find()
        return users
    }

    public async getMe(userId: string){
        return await this.userRepository.findOne({where: {id: userId}})
    }

    public async register(userDto :CreateUserDto){
        const existingEmail = await this.findByEmail(userDto.email)
        if(existingEmail)
            throw new Error("User already exist")

        const existingUsername = await this.findByUsername(userDto.username)
        if(existingUsername)
            throw new Error("User already exist")

        let newUser = this.userRepository.create(userDto)
        newUser = await this.userRepository.save(newUser)
        return newUser
    }

}
