import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/users.controllers";
import { validate } from "../middlewares/validate.middleware";
import { registerSchema } from "../utils/validations/auth/register.validation";
import { updateUserSchema } from "../utils/validations/user/updateUser.validation";
const router = express.Router();

// CREATE
router
  .route("/")
  .post(authMiddleware, adminMiddleware, validate(registerSchema), createUser);

// READ / UPDATE / DELETE
router.route("/").get(authMiddleware, adminMiddleware, getAllUsers);
router
  .route("/:userId")
  .get(authMiddleware, getUserById)
  .patch(authMiddleware, validate(updateUserSchema), updateUser)
  .delete(authMiddleware, deleteUser);

export default router;
