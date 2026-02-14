import Complaint from "../models/Complaint.js";

// Get complaints assigned to maintenance staff
export const getAssignedComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({
      assignedTo: req.user._id,
    }).populate("userId", "name email");

    res.json({ success: true, complaints });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

// Update complaint status
export const updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const complaint = await Complaint.findOneAndUpdate(
      {
        _id: req.params.id,
        assignedTo: req.user._id,
      },
      { status },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found or not assigned to you",
      });
    }

    res.json({ success: true, complaint });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};
