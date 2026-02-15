import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    summary: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },

    status: {
      type: String,
      enum: ["Pending", "Assigned", "Resolved"],
      default: "Pending",
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    beforeImage: {
      type: String,
    },

    afterImage: {
      type: String,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Complaint", complaintSchema);
