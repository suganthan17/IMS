import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getAssignedComplaints,
  updateComplaintStatus,
} from "../controllers/maintenanceController.js";

const router = express.Router();

router.use(authMiddleware);

// Only maintenance role allowed
router.use((req, res, next) => {
  if (req.user.role !== "maintenance") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
});

router.get("/assigned", getAssignedComplaints);
router.put("/update-status/:id", updateComplaintStatus);

export default router;
