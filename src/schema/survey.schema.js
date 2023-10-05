import { body } from "express-validator";
import { Question } from "../models/Question";
import { createUserSchema } from "./user.schema";
import { Option } from "../models/Options";

const commonSchemaOptions = [
  body("answers")
    .exists()
    .withMessage("Debe proporcionar las respuestas de la encuesta")
    .bail()
    .isObject()
    .withMessage("Las respuestas deben ser un objeto de pares ID_pregunta-ID_respuesta")
    .bail()
    .custom(async (answers) => {
      const questionIds = Object.keys(answers);
      const optionIds = Object.values(answers);
      const availableQuestion = await Question.availableQuestions();
      const availableOption = await Option.availableOptions();
      const answeredQuestionIds = [];
      for (const questionId of questionIds) {
        for (const optionId of optionIds) {
          if (!availableQuestion.includes(questionId)) {
            throw new Error("ID de pregunta desconocida");
          }
          if (!availableOption.includes(optionId)) {
            throw new Error("ID de opción desconocido");
          }
          const { id } = Question.findOne({
            where: { optionId },
            attributes: ["id"]
          });
          if (!answeredQuestionIds.includes(id)) {
            answeredQuestionIds.push(id);
            continue;
          }
          throw new Error("No puede responder a una pregunta más de una vez") ;
        }
      }
    }),
  ...createUserSchema
];

export const createSurveySchema = [...commonSchemaOptions];
