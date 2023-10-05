import { Survey } from "../models/Survey.js";
import { userService, userService as userServiceInstance } from "./user.service.js";
/**
 * Instance del modelo `Surveys`
 * @typedef {InstanceType<typeof Survey>} SurveyType
 */
/**
 * Servicio que abstrae las operaciones con los datos de una encuesta
 * de los modelos. Permite obtener, crear, borrar y eliminar encuestas
 * y las respuestas que la forman
 */
export class SurveyService {
  /** @type {typeof Survey} */
  surveyModel;
  /** @type {typeof userServiceInstance} */
  userService;

  /**
   * Constructor de la clase. Debe inyectarse un modelo
   * acorde a la interfaz especificada por {@link Survey}
   * @param {typeof Survey} surveyModel
   */
  constructor(surveyModel, userService) {
    this.surveyModel = surveyModel;
    this.userService = userService;
  }
  /**
   * Retorna un arreglo de todos las encuestas 
   * 
   * @returns {Promise<SurveyType[]>}
   */
  async findAll() {
    return this.surveyModel.findAll();
  }
  /**
   * Encuentra una encuesta por ID
   *
   * @param {number} id
   * @returns {Promise<SurveyType | null>}  La encuesta encontrado
   * o null de no existir
   */
  async findById(id) {
    return this.surveyModel.findByPk(id);
  }

  /**
   * Crea una encuesta con los atributos especificados.
   * 
   * @param {{
   *    age: number,
   *    genderId: number,
   *    locationId: number
   * }} user
   * @param {{
   *  [n: number]: number
   * }} answers - Los datos de la encuesta, siendo las claves
   * las ID de las respuestas, y el valor el ID de la opción elegida
   * @returns {Promise<SurveyType | null>} La encuesta creada o null
   * si hubo conflicto
   */
  async create(user, surveyData) {
    const foundUser = await this.userService.create(user);

    if (!foundUser) {
      return null;
    }

    const { id: userId } = user;

    if (!userId) throw new Error(`ID de usuario inválida: ${userId}`);

    const survey = await Survey.create({
        userId
    });

    for (const optionId of Object.entries(surveyData)) {
        await survey.createAnswer({
            optionId
        });
    }
    return survey;
  }

}

export const surveyService = new SurveyService(Survey, userService);