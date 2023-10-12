import { envConfig } from "../config/env.js";
import { sequelize } from "./config.js";
import { surveyService } from "../services/survey.service.js";
import '../models/User.js';
import seedDatabase from "./seeds/seed-db.js";
import { userService } from "../services/user.service.js";

export async function setupDatabase() {
    await sequelize.authenticate()
        .then(() => console.log("Conexión exitosa a la base de datos"))
        .catch(console.error);

    try {
        await sequelize.sync({
             alter: true // !envConfig.IS_PROD
         });
        // Crear registros por defecto
        await seedDatabase(); 
    } catch(err) {
        console.log('No se pudo sincronizar correctamente la base de datos: ', err.message);
    }
}