import { SetMetadata } from '@nestjs/common';
import { Rol } from '../../domain/enum/rol';

export const Roles = (...roles: Rol[]) => SetMetadata('roles', roles);