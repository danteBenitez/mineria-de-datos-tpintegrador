import { Router } from "express";
import {
  createUser,
} from "../controllers/users.controllers.js";
import { createUserSchema } from "../schema/user.schema.js";
import { validate } from "../middleware/validate.js";

const router = Router();

router.post("/", validate(createUserSchema), createUser);

export default router;
