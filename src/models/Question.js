import { sequelize } from "../database/config.js";
import { DataTypes } from "sequelize";

export const Question = sequelize.define('Question', {
    text: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
})

