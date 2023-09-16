import { sequelize } from "../database/config.js";
import { DataTypes } from "sequelize";

export const Question = sequelize.define('Question', {
    text: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
})

// Método utilitario para recuperar todas las
// ID de opciones disponibles
Question.availableQuestions = async () => {
    const questionsId = await Question.findAll({
        attributes: ['id']
    });
    return questionsId.map(l => l.id);
}