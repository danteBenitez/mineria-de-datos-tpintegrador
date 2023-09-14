import { Router } from "express";
import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserInfoByToken,
} from "../controllers/users.controllers.js";
import {
  createUserSchema,
  getUserSchema,
  updateUserSchema,
  deleteUserSchema,
} from "../schema/user.schema.js";
import { validate } from "../middleware/validate.js";
import validateJWT from "../middleware/validate-jwt.js";
import { isAdmin } from "../middleware/isAdmin.js";
const router = Router();

const adminRoute = [validateJWT, isAdmin];
const userRoute = [validateJWT];

router.get("/", adminRoute, getAllUsers);
router.get('/info', userRoute, getUserInfoByToken);
router.get("/:userId", adminRoute, validate(getUserSchema), getUser);
router.post("/", adminRoute, validate(createUserSchema), createUser);
router.put("/:userId", userRoute, validate(updateUserSchema), updateUser);
router.delete("/:userId", userRoute, validate(deleteUserSchema), deleteUser);

export default router;
