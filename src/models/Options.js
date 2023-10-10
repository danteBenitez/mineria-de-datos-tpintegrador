import { sequelize } from "../database/config.js";
import { DataTypes } from "sequelize";

export const Option = sequelize.define('Option', {
    description: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
});

// Método utilitario para recuperar todas las
// ID de opciones disponibles
Option.availableOptions = async () => {
    const options = await Option.findAll({
        attributes: ['id']
    });
    return options.map(op => op.id);
}


