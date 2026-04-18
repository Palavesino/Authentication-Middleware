import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import { Rol } from '../../domain/enum/rol';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<Rol[]>('roles', context.getHandler());
    
    // Si no hay roles requeridos, cualquiera puede acceder
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }
    
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const user = request.user;
    
    // Si no hay usuario (visitante) y se requieren roles
    if (!user) {
      throw new ForbiddenException('Debe iniciar sesión para acceder a este recurso');
    }
    
    // Verificar si el rol del usuario está entre los permitidos
    const hasRole = requiredRoles.includes(user.rol);
    
    if (!hasRole) {
      throw new ForbiddenException('No tiene permisos para acceder a este recurso');
    }
    
    return true;
  }
}