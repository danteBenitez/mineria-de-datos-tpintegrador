import { body } from "express-validator";
import { Gender } from "../models/Gender.js";
import { Location } from "../models/Location.js";
import { StudyLevel } from "../models/StudyLevel.js";

const commonSchemaOptions = {
  validateAge: [
    body("user.age")
      .exists()
      .withMessage("Debe proporcionar su edad")
      .isNumeric().withMessage("La edad debe ser un entero")
      .isInt({
        gt: 0,
        lt: 100
      })
      .withMessage("Debe proporcionar una edad válida")
      .toInt(),
  ],
  validateGender: [
    body("user.genderId")
      .exists()
      .withMessage("Debe proporcionar una ID de género")
      .isNumeric()
      .isInt()
      .withMessage("Debe proporcionar una ID de génera válida")
      .toInt()
      .custom(async (value) => {
        const available = await Gender.availableGenders();
        console.log(available);
        if (!available.includes(value)) {
          throw new Error("id de género inválida");
        }
        return true;
      }),
  ],
  validateLocation: [
    body("user.locationId")
      .exists()
      .withMessage("Debe proporcionar una ID de localidad")
      .isNumeric()
      .isInt()
      .withMessage("Debe proporcionar una ID de localidad válida")
      .toInt()
      .custom(async (value) => {
        const available = await Location.availableLocations();
        if (!available.includes(value)) {
          throw new Error("ID de localidad inválida");
        }
        return true;
      }),
  ],
  validateStudyLevelId: [
    body("user.studyLevelId")
      .exists()
      .withMessage("Debe proporcionar una ID de tipo de nivel de estudio")
      .isNumeric()
      .isInt()
      .withMessage(
        "Debe proporcionar una ID de tipo de nivel de estudio numérica"
      )
      .toInt()
      .custom(async (value) => {
        const available = await StudyLevel.availableLevels();
        if (!available.includes(value)) {
          throw new Error("ID de nivel de estudio inválida");
        }
        return true;
      }),
  ],
};

export const createUserSchema = [
  ...commonSchemaOptions.validateAge,
  ...commonSchemaOptions.validateGender,
  ...commonSchemaOptions.validateLocation,
  ...commonSchemaOptions.validateStudyLevelId,
];
