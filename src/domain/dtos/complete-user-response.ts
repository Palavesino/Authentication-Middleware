import { Expose } from "class-transformer";
import { ShortBaseDto } from "../../common/bases/base-short.dto";
import { Rol } from "../enum/rol";
import { IsBoolean, IsEmail, IsNumber, IsOptional, IsString } from "class-validator";
export class CompleteUserResponseDto extends ShortBaseDto {
    @Expose()
    @IsString()
    name: string;

    @Expose()
    @IsEmail()
    email: string;

    @Expose()
    @IsOptional()
    @IsString()
    phone?: string;

    @Expose()
    @IsOptional()
    @IsString()
    address?: string;

    @Expose()
    @IsOptional()
    @IsString()
    imageUrl?: string;

    @Expose()
    @IsOptional()
    @IsNumber()
    age?: number;

    @Expose()
    @IsBoolean()
    blocked: boolean; 

    @Expose()
    rol: Rol;
}