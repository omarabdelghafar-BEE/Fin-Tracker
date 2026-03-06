import { IsBoolean, IsOptional } from "class-validator";

export class GetUserParamDto{
    @IsOptional()
    @IsBoolean()
    age: number
}