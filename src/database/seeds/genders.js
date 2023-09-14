import { Gender } from "../../models/Gender.js";

const GENDERS = [
    'MASCULINO',
    'FEMENINO',
    'NO BINARIO' 
];

export const createGenders = async () => {
    for (const gender of GENDERS) {
        await Gender.findOrCreate({
            where: { name: gender }
        });
    }
}