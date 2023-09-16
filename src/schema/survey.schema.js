import { body } from "express-validator";
import { Question } from "../models/Question";

const commonSchemaOptions = [
  body("answers")
    .exists()
    .withMessage("Debe proporcionar las respuestas de la encuesta")
    .bail()
    .isObject()
    .withMessage("Las respuestas deben ser un objeto de pares clave-valor")
    .bail()
    .custom(async (anwers) => {
      const questionIds = Object.keys(anwers);
      const optionIds = Object.values(anwers);
      const availableQuestion = await Question.availableQuestions();
      const availableOption = await Option.availableOptions();
      for (const questionId of questionIds) {
        for (const optionId of optionIds) {
          if (!availableQuestion.includes(questionId)) {
            throw new Error("ID de pregunta desconocida");
          }
          if (!availableOption.includes(optionId)) {
            throw new Error("ID de opción desconocido");
          }
        }
      }
    }),
];

export const createSurveySchema = [...commonSchemaOptions];
