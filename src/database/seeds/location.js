import { Location } from "../../models/Location.js";

const DEFAULT_LOCATIONS = [
  "CLORINDA",
  "COMANDANTE FONTANA",
  "EL COLORADO",
  "EL ESPINILLO",
  "ESTANISLAO DEL CAMPO",
  "FORMOSA",
  "GENERAL ENRIQUE MOSCONI",
  "GENERAL LUCIO VICTORIO MANSILLA",
  "GENERAL MANUEL BELGRANO",
  "HERRADURA",
  "IBARRETA",
  "INGENIERO GUILLERMO NICASIO JUÁREZ",
  "LAGUNA BLANCA",
  "LAGUNA NAICK NECK",
  "LAGUNA YEMA",
  "LAS LOMITAS",
  "MAYOR VICENTE VILLAFAÑE",
  "MISIÓN SAN FRANCISCO DE LAISHÍ",
  "MISIÓN TACAAGLÉ",
  "PALO SANTO",
  "PIRANÉ",
  "POZO DEL TIGRE",
  "RIACHO HE-HÉ",
  "SAN MARTÍN DOS",
  "VILLA DOS TRECE",
  "VILLA ESCOLAR",
  "VILLA GENERAL GÜEMES"
];

export const createLocations = async () => {
    for (const location of DEFAULT_LOCATIONS) {
        await Location.create({
            name: location
        });
    }
}