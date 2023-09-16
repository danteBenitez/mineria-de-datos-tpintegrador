import { Router } from "express";
import { registerUser } from "../controllers/auth.controllers.js";
import { createUserSchema } from "../schema/user.schema.js";
import { validate } from "../middleware/validate.js";
const router = Router();

router.post("/register", validate(createUserSchema), registerUser);

export default router;
