import { Gender } from "../../models/Gender.js";

const GENDERS = [
    'MASCULINO',
    'FEMENINO',
    'NO BINARIO' 
];

export const createGenders = async () => {
    for (const gender of GENDERS) {
        await Gender.create({
            name: gender
        });
    }
}