# Authentication Middleware

Backend desarrollado con **NestJS + TypeScript + TypeORM + PostgreSQL** que funciona como middleware de autenticación y autorización para la gestión de usuarios.

## 🚀 Demo

Frontend asociado: [https://authentication-front-end.vercel.app/](https://authentication-front-end.vercel.app/)

## 📋 Características

### 🔐 Autenticación
- Login con JWT
- Registro de usuarios
- Logout con invalidación de tokens
- Middleware de autenticación personalizado
- Protección de rutas por roles

### 👥 Gestión de Usuarios
- CRUD completo de usuarios
- Actualización de roles (solo ADMIN)
- Bloqueo/Desbloqueo de cuentas (solo ADMIN)
- Búsqueda de usuario por ID

### 🛡️ Seguridad
- JWT con expiración
- Tokens almacenados en BD para invalidación
- Passwords hasheados con bcrypt
- Guards personalizados (AuthMiddleware + RolesGuard)
- Variables de entorno para configuración sensible

## 🛠️ Tecnologías

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| NestJS | 11.x | Framework backend |
| TypeScript | 5.x | Tipado estático |
| TypeORM | 0.3.x | ORM para base de datos |
| PostgreSQL | - | Base de datos relacional |
| JWT | 9.x | Tokens de autenticación |
| bcrypt | 6.x | Hashing de contraseñas |
| class-validator | 0.15.x | Validación de DTOs |

## 📁 Estructura del Proyecto

```
src/
├── auth/
│   ├── middleware/
│   │   └── auth.middleware.ts    # Middleware de autenticación
│   └── guards/
│       └── roles.guard.ts         # Guard de roles
├── users/
│   ├── dto/                       # Data Transfer Objects
│   ├── entities/
│   │   ├── user.entity.ts         # Entidad User
│   │   └── auth-token.entity.ts   # Entidad AuthToken
│   ├── users.controller.ts        # Controlador de usuarios
│   └── users.service.ts           # Lógica de negocio
├── common/
│   └── decorators/
│       └── roles.decorator.ts     # Decorador @Roles()
├── config/
│   └── database.config.ts         # Configuración de BD
└── main.ts                        # Punto de entrada
```

## 👥 Roles y Permisos

| Rol | Permisos |
|-----|----------|
| **ADMIN** | • CRUD completo de usuarios<br>• Cambiar roles<br>• Bloquear/Desbloquear usuarios<br>• Acceso a todas las rutas protegidas |
| **USER** | • Ver y editar su propio perfil<br>• Acceso a rutas de usuario |
| **Visitante** | • Solo login y registro |

## 🔐 Decorador @Roles()

```typescript
@Post('logout')
@Roles(Rol.ADMIN, Rol.USER)  // Permite ADMIN y USER
async logout(@Body('userId') userId: string) {
    return await this.userService.logout(userId);
}

@Get('admin-only')
@Roles(Rol.ADMIN)  // Solo ADMIN
async adminOnly() {
    return 'Solo admins';
}
```

## 🔧 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Palavesino/Authentication-Middleware
cd Authentication-Middleware

# Instalar dependencias
npm install

# Configurar variables de entorno (ver sección abajo)
cp .env.example .env

# Ejecutar migraciones (si aplica)
npm run typeorm:run

# Iniciar en modo desarrollo
npm run start:dev

# Build para producción
npm run build

# Iniciar en producción
npm run start:prod
```

## 🗄️ Variables de Entorno

```env
# Neon PostgreSQL (Producción/Desarrollo)
HOST=ep-round-mud-ainbplda-pooler.c-4.us-east-1.aws.neon.tech
DB_PORT=5432
DB_NAME=neondb
DB_USERNAME=neondb_owner
DB_PASSWORD=tu_password
NODE_ENV=development

# JWT
JWT_SECRET=pepe1234
```

> ⚠️ **Nota:** El SSL se maneja automáticamente con `sslmode=require` en la URL de conexión.

## 🔗 API Endpoints

### Autenticación

| Método | Endpoint | Descripción | Acceso |
|--------|----------|-------------|--------|
| POST | `/users/login` | Inicio de sesión | Público |
| POST | `/users/register` | Registro de usuario | Público |
| POST | `/users/logout` | Cierre de sesión | ADMIN / USER |

### Usuarios (CRUD)

| Método | Endpoint | Descripción | Acceso |
|--------|----------|-------------|--------|
| GET | `/users` | Listar todos los usuarios | Solo ADMIN |
| GET | `/users/:id` | Obtener usuario por ID | ADMIN / USER |
| PUT | `/users/:id` | Actualizar usuario | ADMIN / USER |
| DELETE | `/users/:id` | Eliminar usuario | Solo ADMIN |

### Administración

| Método | Endpoint | Descripción | Acceso |
|--------|----------|-------------|--------|
| PATCH | `/users/:id/rol` | Actualizar rol | Solo ADMIN |
| PATCH | `/users/:id/blocked` | Bloquear/Desbloquear | Solo ADMIN |

### Endpoints de Prueba

| Método | Endpoint | Descripción | Acceso |
|--------|----------|-------------|--------|
| GET | `/users/admin-only` | Ruta solo administradores | Solo ADMIN |
| GET | `/users/user-only` | Ruta solo usuarios | Solo USER |
| GET | `/users/user-and-admin` | Ruta para ADMIN y USER | ADMIN / USER |
| GET | `/users/public` | Ruta pública | Público |

## 📦 Entidades

### User

```typescript
{
  id: string;           // UUID
  name: string;         // Nombre completo
  email: string;        // Email único
  password: string;     // Hash de bcrypt
  rol: Rol;            // ADMIN | USER | VIEWER
  blocked: boolean;     // true = bloqueado
  createdAt: Date;
  updatedAt: Date;
}
```

### AuthToken

```typescript
{
  id: string;           // UUID
  token: string;        // JWT token
  user: User;           // Relación con usuario
  createdAt: Date;
}
```

## 🧪 Middleware de Autenticación

```typescript
// Ejemplo de cómo se adjunta el usuario a la request
export interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        email: string;
        rol: Rol;
    };
}
```

## 🛡️ Guards Implementados

### AuthMiddleware
- Verifica token JWT en header `Authorization: Bearer <token>`
- Valida que el token exista en BD (no haya sido invalidado)
- Adjunta usuario a `req.user` si el token es válido

### RolesGuard
- Verifica que el usuario tenga el rol requerido
- Usa el decorador `@Roles()` para definir roles permitidos
- Lanza `ForbiddenException` si no tiene permisos

## 📦 Scripts Disponibles

```json
{
  "start:dev": "Modo desarrollo con hot reload",
  "start:prod": "Modo producción",
  "build": "Build del proyecto",
  "test": "Ejecutar tests",
  "lint": "Lintear código"
}
```

## 🚀 Deploy

El proyecto está configurado para desplegarse en:
- **Render** / **Railway** / **Vercel** (backend compatible)
- Base de datos PostgreSQL en **Neon**

## 📦 Dependencias Principales

```json
{
  "@nestjs/common": "^11.0.1",
  "@nestjs/core": "^11.0.1",
  "@nestjs/jwt": "^11.0.2",
  "@nestjs/typeorm": "^11.0.0",
  "bcrypt": "^6.0.0",
  "class-transformer": "^0.5.1",
  "class-validator": "^0.15.1",
  "dotenv": "^17.3.1",
  "jsonwebtoken": "^9.0.3",
  "pg": "^8.19.0",
  "typeorm": "^0.3.28"
}
```

## 👨‍💻 Autor

**Palavesino** - [GitHub](https://github.com/Palavesino)

## 🔗 Repositorios

- [Backend](https://github.com/Palavesino/Authentication-Middleware)
- [Frontend](https://github.com/Palavesino/Authentication-Frontend)

## ⚠️ Nota

Las variables de entorno no están incluidas por seguridad. Debes crear tu propio archivo `.env` con tus credenciales de base de datos.

---

⭐ Si te gustó el proyecto, ¡no olvides darle una estrella!
