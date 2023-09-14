import { Option } from "../../models/Options.js";

const OPTIONS = {
  1: ["Muy mala", "Mala", "Aceptable", "Buena", "Muy buena"],
  2: [
    "Muy insatisfecho",
    "Insatisfecho",
    "Ni satisfecho ni insatisfecho",
    "Satisfecho",
    "Muy satisfecho",
  ],
  3: [
    "No, nunca lo he hecho",
    "No, no es tan frecuente",
    "Sí, es frecuente",
    "Sí, es muy frecuente",
  ],
  4: [
    "Obtuvo respuesta inmediata, y pudo resolver su problema",
    "Obtuvo respuesta inmediata, pero el operador tuvo que redirigirlo a un técnico",
    "La respuesta no fue inmediata, pero pudo resolver su problema una vez ocurrió",
    "La respuesta no fue inmediata y tuvo que ser redirigido a un técnico para resolver su problema",
  ],
  5: ["Muy lenta", "Lenta", "Lenta en ocasiones", "Fluida"],
  6: [
    "El reloj no enciende correctamente, se queda tildado al iniciar",
    "Las aplicaciones se abren y se cierran inmediatamente",
    "El reloj se ralentiza por momentos",
    "Otro error desconocido. Mencione.",
  ],
  7: ["Nunca", "Poco frecuente", "Frecuente", "Casi siempre"],
  8: ["No lo haría", "Poco probable", "Probable", "Muy probable"],
};

export const createOptions = async () => {
  for (const questionId in OPTIONS) {
    for (const option of OPTIONS[questionId]) {
      await Option.findOrCreate({
        where: {
          description: option,
          questionId,
        },
      });
    }
  }
};
