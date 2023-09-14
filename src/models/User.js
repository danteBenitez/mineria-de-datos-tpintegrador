import { sequelize } from "../database/config.js";
import { DataTypes } from "sequelize";
import { Gender } from "./Gender.js";
import { Location } from "./Location.js";
import { StudyLevel } from "./StudyLevel.js";


export const GENDERS = {
    MALE: 'masculino',
    FEMALE: 'femenino',
}

export const User = sequelize.define('User', {
    age: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        comment: 'La edad del encuestado'
    },
    genderId: {
        type: DataTypes.INTEGER(100),
        references: {
            model: Gender,
        },
        allowNull: false,
    },
    locationId: {
        type: DataTypes.INTEGER(100),
        references: {
            model: Location,
        },
        allowNull: false,
    },
    studyLevelId: {
        type: DataTypes.INTEGER(100),
        references: {
            model: StudyLevel
        }
    }
});

User.hasOne(Gender);
Gender.belongsTo(User);

User.hasOne(Location);
Location.belongsTo(User);

User.hasOne(StudyLevel);
StudyLevel.belongsTo(User);