import { User } from "../models/User.js";
import { UserService } from "../services/user.service.js";
import { comparePassword, hashPassword } from "../utils/hash.js";
import createToken from "../utils/token.js";

const userService = new UserService(User);

export async function registerUser(req, res) {
  try {
    const created = await userService.create(req.body);

    const token = await createToken(created.id.toString());

    res.status(201).json({
      message: "Registrado correctamente",
      token,
    });

  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export async function loginUser(req, res) {
  try {
    const found = await userService.login(req.body);

    if (!found) {
      return res.status(404).json({
        message: 'Usuario o contraseña incorrectos'
      })
    }

    const token = await createToken(found.id.toString());

    res.status(201).json({
      message: "Sesión iniciada correctamente",
      token,
    });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}
