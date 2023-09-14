import { createGenders } from "./genders.js";
import { createLocations } from "./location.js";
import { createOptions } from "./options.js";
import { createQuestions } from "./question.js";
import { createStudyLevels } from "./study-levels.js";

export default async function seedDatabase() {
   await createLocations(); 
   await createGenders();
   await createStudyLevels();
   await createQuestions();
   await createOptions();
}