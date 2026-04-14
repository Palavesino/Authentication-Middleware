import { Entity, Column} from 'typeorm';
import { Base } from '../../common/bases/base.entity';

@Entity('user')
export class User extends Base {

  @Column()
  nombre: string;

  @Column({ unique: true })
  email: string;

  @Column()
  edad: number;

}
