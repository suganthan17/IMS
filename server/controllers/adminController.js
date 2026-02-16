import User from "../models/User.js";
import Complaint from "../models/Complaint.js";
import bcrypt from "bcryptjs";

export const getAllMaintenanceStaff = async (req, res) => {
  try {
    const staff = await User.find({ role: "maintenance" }).select("-password");
    res.json({ success: true, staff });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addStaff = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Staff already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdStaff = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "maintenance",
    });

    const newStaff = await User.findById(createdStaff._id).select("-password");

    res.status(201).json({
      success: true,
      message: "Staff created successfully",
      staff: newStaff,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteStaff = async (req, res) => {
  try {
    const staff = await User.findById(req.params.id);
    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff not found",
      });
    }

    await staff.deleteOne();

    res.json({
      success: true,
      message: "Staff deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const assignComplaint = async (req, res) => {
  try {
    const { staffId } = req.body;
    const complaint = await Complaint.findById(req.params.id).populate(
      "assignedTo",
      "name email"
    );

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    if (!staffId) {
      complaint.assignedTo = null;
      complaint.status = "Pending";
      await complaint.save();

      const updatedComplaint = await Complaint.findById(complaint._id)
        .populate("assignedTo", "name email");

      return res.json({
        success: true,
        complaint: updatedComplaint,
      });
    }

    const staff = await User.findById(staffId);
    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff not found",
      });
    }

    complaint.assignedTo = staffId;
    complaint.status = "Assigned";
    await complaint.save();

    const updatedComplaint = await Complaint.findById(complaint._id)
      .populate("assignedTo", "name email");

    res.json({
      success: true,
      complaint: updatedComplaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
