import { Option } from "../models/Options.js";
import { Question } from "../models/Question.js";

export async function renderForm(req, res) {
    const questions = await Question.findAll({
        include: { model: Option }
    });
    const questionWithOptions = questions.map((question, i) => {
        question.options = question.Options;
        return question;
    })
    console.log(questionWithOptions);
    res.render('index', {
        questions
    });
}