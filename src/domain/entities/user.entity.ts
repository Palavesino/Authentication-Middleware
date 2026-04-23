import { Entity, Column } from 'typeorm';
import { Base } from '../../common/bases/base.entity';
import { Rol } from '../enum/rol';

@Entity('user')
export class User extends Base {

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  age?: number;
  
  @Column({ nullable: true })
  phone?: string;
  
  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  imageUrl?: string;

  @Column({ nullable: true })
  rol: Rol ;

}
