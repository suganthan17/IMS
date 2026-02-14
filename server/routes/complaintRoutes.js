import express from "express";
import {
  createComplaint,
  getAllComplaints,
  getComplaintById,
  updateComplaintStatus,
} from "../controllers/complaintController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/raise", authMiddleware, createComplaint);
router.get("/", authMiddleware, getAllComplaints);
router.get("/:id", authMiddleware, getComplaintById);
router.put("/update-status/:id", authMiddleware, updateComplaintStatus);

export default router;
