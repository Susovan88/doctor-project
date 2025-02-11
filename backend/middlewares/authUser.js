import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const authUser = async(req, res, next) => {
  const token=req.header("uToken");

  if (!token) {
    return res.json({ success: false, message: "Unauthorized" });
  }

  try {
    const decoded=jwt.verify(token.replace("Bearer ", ""),process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    req.user=user;
    next();
    
  } catch (error) {
    res.json({ success: false, message: "Invalid token" });
  }
};

export default authUser;
