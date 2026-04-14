import { Expose } from "class-transformer";
import { ShortBaseDto } from "../../common/bases/base-short.dto";

export class RegisterRequest extends ShortBaseDto {
    @Expose()
    name: String;
    @Expose()
    email: string;
    @Expose()
    password: string;
}


