import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getAllMaintenanceStaff,
  assignComplaint,
  addStaff,
  deleteStaff,
} from "../controllers/adminController.js";

const router = express.Router();
router.use(authMiddleware);
router.use((req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
});

router.get("/staff", getAllMaintenanceStaff);
router.put("/assign/:id", assignComplaint);
router.post("/add-staff", addStaff);
router.delete("/staff/:id", deleteStaff);

export default router;
