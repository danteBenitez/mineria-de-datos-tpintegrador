import { StudyLevel } from "../../models/StudyLevel.js";

const STUDY_LEVELS = {
    INICIAL: 1,
    PRIMARIA: 2,
    SECUNDARIA: 3,
    SUPERIOR_NO_UNIVERSITARIO: 4,
    SUPERIOR_UNIVERSITARIO: 5
}

export const createStudyLevels = async () => {
    for (const level in STUDY_LEVELS) {
        await StudyLevel.create({
            id: STUDY_LEVELS[level],
            description: level
        });
    }
}