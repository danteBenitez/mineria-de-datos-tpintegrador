import { sequelize } from '../database/config.js';
import { DataTypes } from 'sequelize';

export const Gender = sequelize.define('Gender', {
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: 'Género del encuestado. Puede ser \'F\' para femenino, \'M\' para masculino.'
    }
})

