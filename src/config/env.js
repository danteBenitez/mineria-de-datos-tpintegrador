import 'dotenv/config'

export const envConfig = {
    PORT: process.env.PORT || 8080,
    SECRET: process.env.SECRET || 'clave_secreta',
    DB: {
        NAME: process.env.DB_NAME || 'survey',
        PASSWORD: process.env.DB_PASSWORD || '',
        USER: process.env.DB_USER || 'root',
        HOST: process.env.DB_HOST || 'localhost',
        DIALECT: process.env.DB_DIALECT || 'mysql',
        PORT: process.env.DB_PORT || 3306
    },
    IS_PROD: process.env.NODE_ENV === 'production'
}