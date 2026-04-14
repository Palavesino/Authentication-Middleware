import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { Base } from '../../common/bases/base.entity';
import { User } from './user.entity';

@Entity('auth_tokens')
export class AuthToken extends Base {

    @Column()
    token: string;

    @OneToOne(() => User)
    @JoinColumn({ name: 'id_user' })
    user: User;


}


