import { Op } from "sequelize";
import { Survey } from "../models/Survey.js";
import { comparePassword, hashPassword } from "../utils/hash.js";
import { secondRadiationDependencies } from "mathjs";


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

  /**
   * Constructor de la clase. Debe inyectarse un modelo
   * acorde a la interfaz especificada por {@link Survey}
   * @param {typeof Survey} surveyModel
   */
  constructor(surveyModel) {
    this.surveyModel = surveyModel;
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
   *  [number]: number
   * }} surveyData - Los datos de la encuesta, siendo las claves
   * las ID de las respuestas, y el valor el ID de la opción elegida
   * @returns {Promise<SurveyType | null>} La encuesta creada o null
   * si hubo conflicts
   */
  async create(userId, surveyData) {
    const survey = await Survey.create({
        userId
    });

    for (const [_questionId, optionId] of Object.entries(surveyData)) {
        await survey.createAnswer({
            optionId
        });
    }

    return survey;
  }

}

export const surveyService = new SurveyService(Survey);