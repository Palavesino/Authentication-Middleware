
import { Expose } from "class-transformer";
import { ShortBaseDto } from "../../common/bases/base-short.dto";
import { UserResponseDto } from "./user-response.dto";
import { IsString } from "class-validator";

export class AuthResponseDto extends ShortBaseDto {
    @Expose()
    @IsString()
    token: String;

    @Expose()
    user: UserResponseDto;
}



