import { ROLES } from "../models/User.js";

export async function isAdmin(req, res, next) {
    const role = req.user.role;
    if (role === ROLES.ADMIN) {
        return next()
    }
    res.status(403).json({
        message: 'No tiene los permisos para visitar esta ruta'
    });
}