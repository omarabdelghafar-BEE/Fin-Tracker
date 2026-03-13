import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsDateString, Length } from 'class-validator';
import { Role } from '../../Entities/enums/Roles.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @Length(1, 30)
    @ApiProperty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 30)
    @ApiProperty()
    lastName: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Length(3, 20)
    @ApiProperty()
    username: string;

    @IsDateString()
    @IsOptional()
    @ApiProperty()
    dateOfBirth?: Date;

    @IsEnum(Role)
    @IsOptional() // Or IsNotEmpty depending on if you have a default
    @ApiProperty()
    role?: Role;
}
