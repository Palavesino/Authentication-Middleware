
import { Expose } from "class-transformer";
import { ShortBaseDto } from "../../common/bases/base-short.dto";
import { UserResponseDto } from "./user-response.dto";

export class AuthResponseDto extends ShortBaseDto {
    @Expose()
    token: String;

    @Expose()
    user: UserResponseDto;
}



