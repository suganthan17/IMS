import express from "express";
import {
  createComplaint,
  getAllComplaints,
  getComplaintById,
} from "../controllers/complaintController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/raise", authMiddleware, createComplaint);
router.get("/", authMiddleware, getAllComplaints);
router.get("/:id", authMiddleware ,  getComplaintById);

export default router;
