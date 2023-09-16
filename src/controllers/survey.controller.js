import { surveyService } from "../services/survey.service";

export async function createSurvey(req, res) {
    const { id: userId } = req.user;
    const {
        answers
    } = req.body;

    try {
        const newSurvey = await surveyService.create(userId, answers);

        if (!newSurvey) {
            return res.status(400).json({
                message: 'No se ha podido crear el usuario'
            })
        }

        res.status(201).json({
            message: 'Encuesta creada correctamente',
            survey: newSurvey
        })

    } catch(err) {
        console.error('Error al recibir respuestas: ', err);
        res.status(500).json({
            message: 'Error interno del servidor'
        })
    }
}