import { createGenders } from "./genders.js";
import { createLocations } from "./location.js";
import { createStudyLevels } from "./study-levels.js";

export default async function seedDatabase() {
   await createLocations(); 
   await createGenders();
   await createStudyLevels();
}