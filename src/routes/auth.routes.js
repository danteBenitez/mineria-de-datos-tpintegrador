import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth.controllers.js";
import { loginUserSchema, registerUserSchema } from "../schema/user.schema.js";
import { validate } from "../middleware/validate.js";
const router = Router();

router.post("/login", validate(loginUserSchema), loginUser);
router.post("/register", validate(registerUserSchema), registerUser);

export default router;
