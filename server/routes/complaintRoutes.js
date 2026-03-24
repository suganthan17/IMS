import express from "express";
import {
  createComplaint,
  getAllComplaints,
  getComplaintById,
  updateComplaintStatus,
  deleteComplaint
} from "../controllers/complaintController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/raise", authMiddleware, upload.single("image"), createComplaint);

router.get("/", authMiddleware, getAllComplaints);

router.get("/:id", authMiddleware, getComplaintById);

router.put(
  "/update-status/:id",
  authMiddleware,
  upload.single("image"),
  updateComplaintStatus,
);
router.delete("/:id", authMiddleware, deleteComplaint);


export default router;
