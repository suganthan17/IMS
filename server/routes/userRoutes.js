import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getAllUsers } from "../controllers/userController.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getAllUsers);

export default router;
