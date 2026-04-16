import { Expose } from "class-transformer";
import { IsString, IsEmail, MinLength } from "class-validator";

export class RegisterRequestDto {

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsString()
  password: string;
}