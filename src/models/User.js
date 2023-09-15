import { sequelize } from "../database/config.js";
import { Answer } from "./Answer.js";
import { DataTypes } from "sequelize";
import { Gender } from "./Gender.js";
import { Location } from "./Location.js";
import { StudyLevel } from "./StudyLevel.js";
import { Question } from "./Question.js";
import { Option } from "./Options.js";
import { Survey } from "./Survey.js";

export const User = sequelize.define('User', {
    age: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        comment: 'La edad del encuestado'
    },
});

User.belongsTo(Gender, { foreignKey: 'genderId' });
Gender.hasMany(User, { foreignKey: 'genderId' });

User.belongsTo(Location, { foreignKey: 'locationId' });
Location.hasMany(User, { foreignKey: 'locationId' }),

User.belongsTo(StudyLevel, { foreignKey: 'studyLevelId' });
StudyLevel.hasMany(User, { foreignKey: 'studyLevelId'});

Answer.belongsTo(Survey, { foreignKey: 'surveyId' });
Survey.hasMany(Answer, { foreignKey: 'surveyId' });

Question.hasMany(Option, { foreignKey: 'questionId' });
Option.belongsTo(Question, { foreignKey: 'questionId' });

User.hasOne(Survey, { foreignKey: 'userId' });
Survey.belongsTo(User, { foreignKey: 'userId' });