import { Environment, EnvTypes } from './types';

export default (): EnvTypes => {
    const environment = process.env.NODE_ENV as Environment || 'development';
    return {
        port: parseInt(process.env.PORT || '3000', 10),
        dbUrl: process.env.DB_URL || 'mongodb://localhost:27017/ocm',
        environment,
        secret: process.env.SECRET || 'secret',
    };
};