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
      beforeImage: req.file ? req.file.path : null,
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
      complaints = await Complaint.find()
        .populate("assignedTo", "name email")
        .sort({ createdAt: -1 });
    } else if (req.user.role === "maintenance") {
      complaints = await Complaint.find({
        assignedTo: req.user._id,
      })
        .populate("assignedTo", "name email")
        .sort({ createdAt: -1 });
    } else {
      complaints = await Complaint.find({
        userId: req.user._id,
      })
        .populate("assignedTo", "name email")
        .sort({ createdAt: -1 });
    }

    res.status(200).json({
      success: true,
      count: complaints.length,
      complaints,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id).populate(
      "assignedTo",
      "name email",
    );

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    const isAdmin = req.user.role === "admin";
    const isOwner = complaint.userId.toString() === req.user._id.toString();
    const isAssignedStaff =
      complaint.assignedTo &&
      complaint.assignedTo._id.toString() === req.user._id.toString();

    if (!isAdmin && !isOwner && !isAssignedStaff) {
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

export const updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    if (
      req.user.role !== "admin" &&
      complaint.assignedTo?.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    if (complaint.status === "Resolved") {
      return res.status(400).json({
        success: false,
        message: "Resolved complaints cannot be modified",
      });
    }

    complaint.status = status;

    if (status === "Resolved") {
      complaint.resolvedAt = new Date();

      if (req.file) {
        complaint.afterImage = req.file.path;
      }
    }

    await complaint.save();

    res.status(200).json({
      success: true,
      message: "Status updated successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
