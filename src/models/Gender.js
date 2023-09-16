import { sequelize } from '../database/config.js';
import { DataTypes } from 'sequelize';

export const Gender = sequelize.define('Gender', {
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: 'Género del encuestado. Puede ser FEMENINO, MASCULINO, o NO BINARIO'
    }
})

// Método utilitario para recuperar todas las
// ID de géneros disponibles
Gender.availableGenders = async () => {
    const genders = await Gender.findAll({
        attributes: ['id']
    });
    return genders.map(g => g.id);
}
