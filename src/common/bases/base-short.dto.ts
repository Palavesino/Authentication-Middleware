
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsUUID } from 'class-validator';


export class ShortBaseDto {
    @Expose()
    @IsNotEmpty()
    @IsUUID()
    id: string;
}