import { User } from "../models/User.js";
import { userService } from "../services/user.service.js";

export async function getAllUsers(_req, res) {
    try {
        const foundUsers = await userService.findAll();

        if (foundUsers.length == 0) {
            return res.status(404).json({
                message: 'No hay usuarios que mostrar'
            })
        }

        res.status(200).json({
            users: foundUsers
        });

    } catch(err) {
        console.error(err)
        res.sendStatus(500)
    }
}

export async function getUser(req, res) {
    const { userId } = req.params;

    try {
        const found = await userService.findById(userId);

        if (!found) {
            return res.status(404).json({
                message: 'No se encontró el usuario'
            })
        }

        res.status(200).json({
            user: found
        });

    } catch(err) {
        console.error(err)
        res.sendStatus(500);
    }

}

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

export async function updateUser(req, res) {
    const { userId } = req.params;
    const { id }  = req.user;

    if (userId !== id) {
        return res.sendStatus(403);
    }

    try {

        const found = await userService.update(userId, req.body);

        if (!found) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            })
        }

        res.status(200).json({
            message: 'Usuario actualizado correctamente',
            user: found
        });

    } catch(err) {
        console.error(err)
        res.sendStatus(500);
    }
}

export async function deleteUser(req, res) {
    const { userId } = req.params;
    const { id }  = req.user;

    if (userId !== id) {
        return res.sendStatus(403);
    }

    try {
        const found = await userService.findById(userId);

        if (!found) {
            return res.status(404).json({
                message: 'usuario no encontrado'
            })
        }
        await found.destroy();

        res.status(200).json({
            message: 'Usuario borrado correctamente',
            user: found
        })

    } catch(err) {
        res.sendstatus(500);
    }
}

export async function getUserInfoByToken(req, res) {
    return res.status(200).json({
        user: req.user
    })
}
