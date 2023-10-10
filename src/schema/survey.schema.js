import { body } from "express-validator";
import { Question } from "../models/Question.js";
import { createUserSchema } from "./user.schema.js";
import { Option } from "../models/Options.js";

const commonSchemaOptions = [
  body("answers")
    .exists()
    .withMessage("Debe proporcionar las respuestas de la encuesta")
    .bail()
    .isObject()
    .withMessage("Las respuestas deben ser un objeto de pares ID_pregunta-ID_respuesta")
    .bail()
    .customSanitizer(answers => {
      const keys = Object.keys(answers);
      const newAnswers = {};
      for (const key of keys) {
        newAnswers[parseInt(key)] = parseInt(answers[key]);
      }
      return newAnswers
    })
    .custom(async (answers) => {
      const questionIds = Object.keys(answers);
      const optionIds = Object.values(answers);
      const availableQuestion = await Question.availableQuestions();
      const availableOption = await Option.availableOptions();
      for (const questionId of questionIds) {
        for (const optionId of optionIds) {
          const questionNumber = parseInt(questionId);
          const optionNumber = parseInt(optionId);
          if (!availableQuestion.includes(questionNumber)) {
            throw new Error("ID de pregunta desconocida");
          }
          if (!availableOption.includes(optionNumber)) {
            throw new Error("ID de opción desconocido");
          }
        }
      }
      const answeredQuestionsId = optionIds.map(async optionId => {
        const { questionId: answeredId }= await Option.findOne({
          where: { id: optionId },
          attributes: ["questionId"]
        });
        return answeredId;
      });
      const repeated = new Set(answeredQuestionsId).size !== answeredQuestionsId.length;
      if (repeated) {
        console.log("Answered: ", answeredQuestionsId);
        throw new Error("Sólo puedes responder una opción por cada pregunta.");
      }
      return true;
    }),
  ...createUserSchema
];

export const createSurveySchema = [...commonSchemaOptions];
