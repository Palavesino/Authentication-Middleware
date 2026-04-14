import { Expose } from "class-transformer";
import { ShortBaseDto } from "../../common/bases/base-short.dto";

export class AuthRequest extends ShortBaseDto {

    @Expose()
    email: string;
    @Expose()
    password: string;

}
