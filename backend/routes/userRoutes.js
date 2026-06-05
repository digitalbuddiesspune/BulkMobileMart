import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { signup, login, getMe, getUsers } from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", protect, getMe);
router.get("/", protect, getUsers);

export default router;
