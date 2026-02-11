import User from "../models/User.js";
import bcrypt from "bcryptjs";

const createAdmin = async () => {
  const adminExists = await User.findOne({ role: "admin" });

  if (!adminExists) {
    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD,
      10
    );

    await User.create({
      name: "System Admin",
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin",
      isApproved: true,
    });

    console.log("✅ Default Admin Created");
  }
};

export default createAdmin;
