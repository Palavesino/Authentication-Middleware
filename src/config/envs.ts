import * as dotenv from 'dotenv';

dotenv.config();

export const envConfig = {
    HOST: process.env.HOST || 'localhost',
    DB_PORT: Number(process.env.DB_PORT) || 5432,
    DB_NAME: process.env.DB_NAME || 'mi_basedatos',
    DB_USERNAME: process.env.DB_USERNAME || 'postgres',
    DB_PASSWORD: process.env.DB_PASSWORD || '',
    NODE_ENV: process.env.NODE_ENV || 'development',
    IS_NEON: process.env.HOST?.includes('neon.tech') || false,
};