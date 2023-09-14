import { sequelize } from "../database/config.js";
import { DataTypes } from "sequelize";
import { Gender } from "./Gender.js";
import { Location } from "./Location.js";
import { StudyLevel } from "./StudyLevel.js";

export const User = sequelize.define('User', {
    age: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        comment: 'La edad del encuestado'
    },
});

User.hasOne(Gender);
Gender.hasMany(User);

User.hasOne(Location);
Location.hasMany(User);

User.hasOne(StudyLevel);
StudyLevel.hasMany(User);