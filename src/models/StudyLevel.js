import { sequelize } from "../database/config.js";
import { DataTypes } from "sequelize";

export const StudyLevel = sequelize.define('StudyLevel', {
    description: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: 'El nivel máximo de estudio alcanzado por el encuestado. Va desde inicial a superior, tanto no universitario como universitario'
    }
});

// Método utilitario para recuperar todas las
// ID de opciones disponibles
StudyLevel.availableLevels = () => {
    return StudyLevel.findAll();
}