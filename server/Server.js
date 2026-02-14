import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

/* Routes */
import authRoutes from "./routes/authRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import createAdmin from "./utils/createAdmin.js";
import adminRoutes from "./routes/adminRoutes.js";
import maintenanceRoutes from "./routes/maintenanceRoutes.js";
import userRoutes from "./routes/userRoutes.js";


dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/users", userRoutes);


const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected");
    await createAdmin();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));
