import { Entity, Column } from 'typeorm';
import { Base } from '../../common/bases/base.entity';

@Entity('user')
export class User extends Base {

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  edad?: number;

}
