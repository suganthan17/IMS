import User from "../models/User.js";
import Complaint from "../models/Complaint.js";
import bcrypt from "bcryptjs";
import { sendEmail } from "../utils/sendEmail.js";

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

    sendEmail(
      email,
      "Your IMS Staff Account Credentials",
      `
        <h3>Hello ${name},</h3>
        <p>Your staff account has been created in IMS.</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Password:</b> ${password}</p>
        <p>Please login and change your password immediately.</p>
      `,
    );
  } catch (error) {
    console.error(error);
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

import mongoose from "mongoose";

export const assignComplaint = async (req, res) => {
  try {
    const { staffId } = req.body;

    const complaint = await Complaint.findById(req.params.id).populate(
      "userId",
      "name email",
    );

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    if (complaint.status === "Resolved") {
      return res.status(400).json({
        success: false,
        message: "Resolved complaints cannot be modified",
      });
    }

    // REMOVE ASSIGNMENT
    if (!staffId) {
      complaint.assignedTo = null;
      complaint.status = "Pending";
      await complaint.save();

      return res.json({
        success: true,
        complaint,
      });
    }

    if (!mongoose.Types.ObjectId.isValid(staffId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid staff ID",
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

    return res.json({
      success: true,
      complaint,
    });
  } catch (error) {
    console.error("Assign Complaint Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
