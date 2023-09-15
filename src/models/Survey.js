import { sequelize } from "../database/config.js";
import { DataTypes } from "sequelize";

export const Survey = sequelize.define('Survey');