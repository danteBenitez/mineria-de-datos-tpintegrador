import { User } from "../models/User.js";
import { userService } from "../services/user.service.js";

export async function createUser(req, res) {
    try {
        const created = await userService.create(req.body);

        res.status(201).json({
            message: 'Usuario creado exitosamente',
            user: created
        });

    } catch(err) {
        console.error(err)
        res.sendStatus(500);
    }
}

