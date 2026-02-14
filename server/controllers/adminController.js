import User from "../models/User.js";
import Complaint from "../models/Complaint.js";
import bcrypt from "bcryptjs";

export const getAllMaintenanceStaff = async (req, res) => {
  try {
    const staff = await User.find({ role: "maintenance" }).select("-password");
    res.json({ success: true, staff });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

export const assignComplaint = async (req, res) => {
  try {
    const { staffId } = req.body;

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      {
        assignedTo: staffId,
        status: "Assigned",
      },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    res.json({ success: true, complaint });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

export const addStaff = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email.endsWith("@imsstaff.com")) {
      return res.status(400).json({
        success: false,
        message: "Invalid staff email",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Staff already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newStaff = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "maintenance",
    });

    res.status(201).json({
      success: true,
      staff: newStaff,
    });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};
