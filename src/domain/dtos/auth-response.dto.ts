
import { Expose } from "class-transformer";
import { ShortBaseDto } from "../../common/bases/base-short.dto";

export class AuthResponse extends ShortBaseDto {
    @Expose()
    token: String;
    @Expose()
    type: string;
}



