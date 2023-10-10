const surveyQuestions = document.querySelectorAll('.survey-question');
const form = document.querySelector('form');

const QUESTION_NUMBER = 8;

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const answers = {};
    for (const entry of formData) {
        const isSurveyOption = !isNaN(entry[0]);
        if (!isSurveyOption) continue;
        answers[entry[0]] = entry[1];
    }

    const user = {
        age: formData.get('age'),
        genderId: formData.get('genderId'),
        locationId: formData.get('locationId'),
        studyLevelId: formData.get('studyLevelId')
    };

    console.log("User: ", user);
    console.log("Answers: ", answers);

    const response = await fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user,
            answers
        })
    });
    const { errors } = await response.json();
    console.log(errors);
});

console.log(surveyQuestions);

