import { Sequelize } from "sequelize";
import { envConfig } from "../config/env.js";

const sequelize = new Sequelize({
    host: envConfig.DB.HOST,
    database: envConfig.DB.NAME,
    username: envConfig.DB.USER,
    password: envConfig.DB.PASSWORD,
    dialect: envConfig.DB.DIALECT,
    port: envConfig.DB.PORT,
});

export { sequelize }