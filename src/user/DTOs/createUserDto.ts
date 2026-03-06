import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsDateString, Length } from 'class-validator';
import { Role } from '../../Entities/enums/Roles.enum';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @Length(1, 30)
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 30)
    lastName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Length(3, 20)
    username: string;

    @IsDateString()
    @IsOptional()
    dateOfBirth?: Date;

    @IsEnum(Role)
    @IsOptional() // Or IsNotEmpty depending on if you have a default
    role?: Role;
}
