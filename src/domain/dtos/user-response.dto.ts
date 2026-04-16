import { Expose } from "class-transformer";
import { ShortBaseDto } from "../../common/bases/base-short.dto";

export class UserResponseDto extends ShortBaseDto {
    @Expose()
    name: string;
    @Expose()
    email: string;
}
