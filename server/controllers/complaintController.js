import Complaint from "../models/Complaint.js";

export const createComplaint = async (req, res) => {
  try {
    const { category, summary, location, description } = req.body;

    if (!category || !summary || !location || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const complaint = await Complaint.create({
      category,
      summary,
      location,
      description,
      userId: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Complaint raised successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllComplaints = async (req, res) => {
  try {
    let complaints;

    if (req.user.role === "admin") {
      complaints = await Complaint.find().sort({ createdAt: -1 });
    } else {
      complaints = await Complaint.find({
        userId: req.user._id,
      }).sort({ createdAt: -1 });
    }

    res.status(200).json({
      success: true,
      count: complaints.length,
      complaints,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    if (
      req.user.role !== "admin" &&
      complaint.userId.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    res.status(200).json({
      success: true,
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
