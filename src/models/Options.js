import { sequelize } from "../database/config.js";
import { DataTypes } from "sequelize";

export const Option = sequelize.define('Option', {
    description: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
});


