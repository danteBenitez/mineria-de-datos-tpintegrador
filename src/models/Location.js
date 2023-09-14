import { sequelize } from "../database/config.js";
import { DataTypes } from "sequelize";

export const Location = sequelize.define('Location', {
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: 'La localidad en la que vive el encuestado.'
    },
})
