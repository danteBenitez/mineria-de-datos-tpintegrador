import { Router } from 'express';
import {
    createSurvey
} from '../controllers/survey.controller.js';
import { createSurveySchema } from '../schema/survey.schema.js';
import { validate } from '../middleware/validate.js';

const router = Router();

router.post('/', 
    validate(createSurveySchema),
    createSurvey
);