import { body, param } from "express-validator";
import { ROLES, User } from "../models/User.js";
import { userService } from "../services/user.service.js";

const commonSchemaOptions = {
  validateUsername: [
    body("username")
      .exists()
      .withMessage("Debe proporcionar un nombre de usuario")
      .isString()
      .withMessage("El nombre de usuario debe ser un string")
      .notEmpty()
      .withMessage("EL nombre de usuario no puede estar vacío"),
  ],
  validateEmail: [
    body("email")
      .exists()
      .withMessage("Debe proporcionar una dirección de correo")
      .isString()
      .withMessage("La dirección de correo debe ser un string")
      .notEmpty()
      .withMessage("La dirección de correo no puede estar vacía"),
  ],
  validatePassword: [
    body("password")
      .exists()
      .withMessage("Debe proporcionar una contraseña")
      .isString()
      .withMessage("La contraseña debe ser un string")
      .notEmpty()
      .withMessage("La contraseña no puede estar vacía")
      .isStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minNumbers: 1,
        minLowercase: 1,
        minSymbols: 0,
      })
      .withMessage(
        "La contraseña debe tener más de 8 caracteres, una mayúscula y un número"
      ),
  ],
  validateUserId: [
    param("userId")
      .isNumeric()
      .withMessage("El ID del usuario debe ser numérico")
      .isInt()
      .withMessage("El ID del usuario debe ser entero")
      .toInt(),
  ],
  validateRole: [
    body("role")
      .optional()
      .custom(async (role) => {
        const roles = Object.values(ROLES);
        if (!roles.includes(role))
          throw new Error("Debe proporcionar un rol válido");
      }),
  ],
};

export const createUserSchema = [
  body("username")
    .exists()
    .withMessage("Debe proporcionar un nombre de usuario")
    .isString()
    .withMessage("El nombre de usuario debe ser un string")
    .notEmpty()
    .withMessage("EL nombre de usuario no puede estar vacío")
    .custom(async (username) => {
      const exists = await User.findAll({
        where: {
          username,
        },
      });
      if (exists.length > 0)
        throw new Error("Nombre de usuario o correo no disponibles");
      return true;
    }),
  body("email")
    .exists()
    .withMessage("Debe proporcionar una dirección de correo")
    .isString()
    .withMessage("La dirección de correo debe ser un string")
    .notEmpty()
    .withMessage("La dirección de correo no puede estar vacía")
    .custom(async (email) => {
      const exists = await User.findAll({
        where: {
          email,
        },
      });
      if (exists.length > 0)
        throw new Error("Nombre de usuario o correo no disponibles");
      return true;
    }),
  ...commonSchemaOptions.validatePassword,
  ...commonSchemaOptions.validateRole,
];

export const updateUserSchema = [
  ...commonSchemaOptions.validateEmail,
  ...commonSchemaOptions.validatePassword,
  ...commonSchemaOptions.validateUsername,
  ...commonSchemaOptions.validateUserId,
  body("role")
    .exists().withMessage('Debe proporcionar un rol válido')
    .custom(value => {
      if (Object.values(ROLES).includes(value)) {
        return true;
      }
      throw new Error('Debe proporcionar un rol válido')
    })
    .custom((value, { req }) => {
    // Sólo los administradores pueden cambiar el rol
    if (req.user.role === "admin") {
      return true;
    } else if (req.user.role === value) {
      return true; 
    }
    throw new Error('No tienes permiso de actualizar tu rol');
  }),
];

export const deleteUserSchema = [...commonSchemaOptions.validateUserId];

export const getUserSchema = [...commonSchemaOptions.validateUserId];

export const loginUserSchema = [
  ...commonSchemaOptions.validateUsername,
  body("password")
    .exists()
    .withMessage("Debe proporcionar una contraseña")
    .isString()
    .withMessage("La contraseña debe ser un string")
    .notEmpty()
    .withMessage("La contraseña no puede estar vacía"),
];

export const registerUserSchema = [...createUserSchema];
