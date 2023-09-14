import jwt from "jsonwebtoken";
import { envConfig } from "../config/env.js";

export default function createToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, envConfig.SECRET, (err, token) => {
      if (err) reject(err);
      else resolve(token);
    });
  });
}
