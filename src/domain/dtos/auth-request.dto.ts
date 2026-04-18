import { Expose } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";

export class AuthRequestDto {

    @Expose()
    @IsEmail()
    email: string;

    @Expose()
    @IsString()
    @MinLength(4)
    password: string;

}
