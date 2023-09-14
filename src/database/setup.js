import { envConfig } from "../config/env.js";
import { sequelize } from "./config.js";
import '../models/User.js';
import seedDatabase from "./seeds/seed-db.js";

export async function setupDatabase() {
    await sequelize.authenticate()
        .then(() => console.log("Conexión exitosa a la base de datos"))
        .catch(console.error);

    try {
        await sequelize.sync({
            force: !envConfig.IS_PROD
        });
        // Crear registros por defecto
        await seedDatabase(); 
    } catch(err) {
        console.log('No se pudo sincronizar correctamente la base de datos: ', err.message);
    }
}