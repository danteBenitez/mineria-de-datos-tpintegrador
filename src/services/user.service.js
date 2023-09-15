import { Op } from "sequelize";
import { User } from "../models/User.js";
import { comparePassword, hashPassword } from "../utils/hash.js";


/**
 * Instance del modelo `Users`
 * @typedef {InstanceType<typeof User>} UserType
 */
/**
 * Servicio que abstrae las operaciones con los datos del usuario
 * de los modelos. Permite obtener, crear, borrar y eliminar usuarios
 */
export class UserService {
  /** @type {typeof User} */
  userModel;

  /**
   * Constructor de la clase. Debe inyectarse un modelo
   * acorde a la interfaz especificada por {@link User}
   * @param {typeof User} userModel
   */
  constructor(userModel) {
    this.userModel = userModel;
  }
  /**
   * Retorna un arreglo de todos los usuarios
   * 
   * @returns {Promise<UserType[]>}
   */
  async findAll() {
    return this.userModel.findAll();
  }
  /**
   * Encuentra un usuario por ID
   *
   * @param {number} id
   * @returns {Promise<UserType | null>}  El usuario encontrado
   * o null de no existir
   */
  async findById(id) {
    return this.userModel.findByPk(id);
  }

  /**
   * Devuelve true si un usuario existe con
   * los parámetros proporcionados y false en
   * caso contrario
   *
   * @param {{ email: string, username: string}} attributes
   * @returns {Promise<boolean>}
   */
  async exists({ email, username }) {
    const found = await this.userModel.findOne({
      where: {
        [Op.or]: {
          username,
          email,
        },
      },
    });

    return found !== null;
  }

  /**
   * Crea un usuario con los atributos especificados.
   * Toma en cuenta conflictos y encripta la
   * contraseña
   *
   * @param {{
   *   age: number,
   *   genderId: number,
   *   locationId: number,
   *   
   * }} userData - Los datos del usuario a crear
   * @returns {Promise<UserType | null>} El usuario creado o null
   * si hubo conflicts
   */
  async create({ age, genderId, locationId, studyLevelId }) {
    const created = await this.userModel.create({
      age,
      genderId,
      locationId,
      studyLevelId
    });

    return created;
  }

  /**
   * Acutaliza el usuario especificado
   * con los atributos especificados.
   * Toma en cuenta conflictos y encripta la
   * contraseña de actualizarse
   *
   * @param {number} userId
   * @param {{
   *   email: string,
   *   username: string,
   *   password: string,
   *   role: string
   * }} userData - Los datos del usuario a crear
   * @returns {Promise<UserType | null>} El usuario actualizado
   * o un error representando qué salió mal
   */
  async update(userId, { password, ...rest }) {
    const existingUser = await this.findById(userId);

    if (!existingUser) {
      return null;
    }

    const hashedPassword = await hashPassword(password);
    await existingUser.update({ ...rest, password: hashedPassword });

    return existingUser;
  }


  /**
   * Autentica un usuario con su username
   * y contraseña
   * 
   * @param {{
   *   username: string,
   *   password: string,
   * }} userData
   * @returns {Promise<UserType | null>} El usuario registrado
   * o null si hubo un error
   */
  async login({ username, password }) {
    const found = await this.userModel.findOne({
        where: {
            username,
        }
    });

    if (!found || !(await comparePassword(password, found.password))) {
        return null;
    }

    return found;
  }
}

export const userService = new UserService(User);