import { User } from "../models/User.js";

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


}

export const userService = new UserService(User);