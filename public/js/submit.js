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
    try {

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
        
        if (!response.ok) throw response;

    } catch(res) {
        console.error(res);
        const { errors } = await res.json();
        if (!errors) {
            Swal.fire({
                icon: 'error',
                title: 'Error desconocido',
                footer: 'Contáctese con los desarrolladores del sitio.'
            });
            return;
        }
        Swal.fire({
            icon: 'error',
            title: res.status == 400 ? 'Error de validación' : 'Error desconocido',
            text: errors[0].msg
        })
    }



});

console.log(surveyQuestions);

