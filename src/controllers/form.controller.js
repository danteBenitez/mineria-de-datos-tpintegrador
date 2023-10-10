import { Option } from "../models/Options.js";
import { Question } from "../models/Question.js";
import { Gender } from '../models/Gender.js';
import { StudyLevel } from '../models/StudyLevel.js';
import { Location } from "../models/Location.js";

export async function renderForm(req, res) {
    const questions = await Question.findAll({
        include: { model: Option }
    });
    const genders = await Gender.findAll();
    const studyLevels = await StudyLevel.findAll();
    const locations = await Location.findAll();
    const questionWithOptions = questions.map((question, i) => {
        question.options = question.Options;
        return question;
    })
    console.log(questionWithOptions);
    res.render('index', {
        questions,
        genders,
        studyLevels,
        locations
    });
}