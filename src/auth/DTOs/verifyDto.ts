import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';

export class VerifyDto {
    @IsNotEmpty()
    @ApiProperty()
    token: string;
}
