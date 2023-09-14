import { envConfig } from "../config/env.js";
import { User } from "../models/User.js";
import jwt from 'jsonwebtoken';

export default async function validateJWT(req, res, next) {
    const token = req.headers.authorization;
    if (!token) { 
        console.log("Token not found");
        return res.sendStatus(403);
    }

    try {
        const id = jwt.verify(token, envConfig.SECRET);

        const foundUser = await User.findByPk(id);

        if (!foundUser) {
            return res.status(400).json({
                message: 'Credenciales inválidas'
            })
        }

        req.user = foundUser;
        next();
    } catch(err) {
        console.error("Error al decodificar token: ", err);
        res.sendStatus(500);
    }
}