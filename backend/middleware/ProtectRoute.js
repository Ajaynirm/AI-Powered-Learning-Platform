// middleware/protectRoute.js
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import User from "../models/User.js";

export const ProtectRoute = [
  ClerkExpressRequireAuth(),
  async (req, res, next) => {
    try {
      const user = await User.findOne({
        where: { clerk_user_id: req.auth.userId },
        attributes: ["id", "full_name", "email"],
      });
      

      if (!user) {
        return res.status(403).json({ message: "User not found in local DB" });
      }

      req.user = user; 
      next();
    } catch (err) {
      console.error("ProtectRoute error:", err.message);
      res.status(500).json({ message: "Internal server error" });
    }
  },
];

