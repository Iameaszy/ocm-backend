export enum Environment {
    development = 'development',
    production = 'production',
}

export type EnvTypes = {
    port: number;
    secret: string;
    environment: Environment,
    dbUrl: string
};
