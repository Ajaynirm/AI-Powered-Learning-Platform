import { Webhook } from "svix";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();
const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const receiveNewUserFromClerk = async (req, res) => {
  const payload = req.body.toString();
  const headers = req.headers;
  try {
    const wh = new Webhook(webhookSecret);

    // Verify signature using Svix
    const event = wh.verify(payload, headers);

    // do your logic
    if (event.type === "user.created") {
      const userData = event.data;

      const clerk_user_id = userData.id;
      const first_name = userData.first_name || "";
      const last_name = userData.last_name || "";
      const full_name = `${first_name} ${last_name}`.trim();

      const email = userData.email_addresses?.[0]?.email_address || null;

      console.log("Creating new user:", { clerk_user_id, full_name, email });
      try {
        // Save to DB
        await User.create({
          clerk_user_id,
          full_name,
          email,
          password: null, // since Clerk handles authentication
        });
  
        console.log("User saved successfully.");
      } catch (err) {
        console.log("error in user table insertion ", err);
      }
    }

    

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Webhook verification failed:", err);
    res.status(400).json({ error: "Invalid signature" });
  }
};
