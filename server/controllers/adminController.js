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

export const assignComplaint = async (req, res) => {
  try {
    const { staffId } = req.body;
    const complaint = await Complaint.findById(req.params.id);

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

      return res.json({
        success: true,
        message: "Assignment removed successfully",
        complaint,
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

    const htmlContent = `
      <h2>New Complaint Assigned</h2>
      <p>Hello ${staff.name},</p>
      <p>You have been assigned a new complaint:</p>
      <p><strong>${complaint.summary}</strong></p>
      <p>Please log in to IMS to take action.</p>
      <br/>
      <p>Regards,<br/>IMS Team</p>
    `;

    await sendEmail(staff.email, "IMS - New Complaint Assigned", htmlContent);

    res.json({
      success: true,
      message: "Complaint assigned & email sent",
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
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

    const newStaff = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "maintenance",
    });

    const htmlContent = `
      <h2>Welcome to IMS</h2>
      <p>Hello ${name},</p>
      <p>Your staff account has been created.</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Password:</strong> ${password}</p>
      <br/>
      <p>Please login and change your password after first login.</p>
      <br/>
      <p>Regards,<br/>IMS Admin</p>
    `;

    await sendEmail(email, "IMS Staff Account Created", htmlContent);

    res.status(201).json({
      success: true,
      message: "Staff created & credentials emailed",
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

