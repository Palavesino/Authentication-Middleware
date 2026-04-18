import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthToken } from '../../domain/entities/auth-token.entity';
import { Rol } from '../../domain/enum/rol';

export interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        email: string;
        rol: Rol;
    };
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(AuthToken)
        private tokenRepository: Repository<AuthToken>,
    ) { }

    async use(req: AuthenticatedRequest, res: Response,   next: NextFunction) {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            // Visitante (sin token) - req.user queda undefined
            return next();
        }

        const token = authHeader.replace('Bearer ', '');

        try {
            // Validar token y extraer payload
            const payload = this.jwtService.verify(token);

            // Verificar que el token exista en BD (no haya sido invalidado)
            const tokenInDb = await this.tokenRepository.findOne({
                where: { token },
                relations: ['user'],
            });

            if (!tokenInDb) {
                throw new UnauthorizedException('Token no válido');
            }

            // Adjuntar usuario a la request
            req.user = {
                id: payload.sub,
                email: payload.email,
                rol: payload.rol,
            };

            next();
        } catch (error) {
            if (error instanceof Error && error.name === 'TokenExpiredError') {
                throw new UnauthorizedException('Token expirado');
            }
            throw new UnauthorizedException('Token inválido');
        }
    }
}