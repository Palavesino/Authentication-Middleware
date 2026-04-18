import { Expose } from "class-transformer";
import { ShortBaseDto } from "../../common/bases/base-short.dto";
import { Rol } from "../enum/rol";
import { IsEmail, IsString } from "class-validator";

export class UserResponseDto extends ShortBaseDto {
    @Expose()
    @IsString()
    name: string;
    @Expose()
    @IsEmail()
    email: string;
    @Expose()
    rol: Rol;
}
