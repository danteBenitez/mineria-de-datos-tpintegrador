import { Question } from "../../models/Question.js";

const QUESTIONS = [
  "¿Cómo calificaría la integración del reloj digital con los demás productos de la marca?",
  "¿Cuál es su grado de satisfacción con el soporte al cliente del producto?",
  "¿Es frecuente que presente reclamos sobre el funcionamiento?",
  "Al realizar un reclamo o una consulta al soporte al cliente:",
  "Considera que la experiencia al usar el reloj en general es",
  "¿Cuáles errores encontró al utilizar el reloj?",
  "¿Con qué frecuencia encuentra que los servicios que requieren de conexión de red (p. ej. correo electrónico o SMS) no están disponibles, aún cuando hay conexión adecuada?",
  "¿Cuál es la probabilidad de que vuelva a comprar un producto similar a este?"
];

export const createQuestions = async () => {
    for (const question of QUESTIONS){
        await Question.findOrCreate({
            where: {
                text: question
            }
        })
    }
}