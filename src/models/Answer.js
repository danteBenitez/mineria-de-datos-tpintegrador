import { sequelize } from "../database/config.js";
import { Option } from "./Options.js";

export const Answer = sequelize.define('Answer', {
});

Answer.hasOne(Option, { foreignKey: 'optionId' });
Option.hasMany(Answer, { foreignKey: 'optionId' });

