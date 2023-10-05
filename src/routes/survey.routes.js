import { Router } from 'express';
import {
    createSurvey
} from '../controllers/survey.controller.js';
import { createSurveySchema } from '../schema/survey.schema.js';
import { validate } from '../middleware/validate.js';
import { renderForm } from '../controllers/form.controller.js';

const router = Router();

router.get('/', renderForm);
router.post('/', 
    validate(createSurveySchema),
    createSurvey
);

export default router;