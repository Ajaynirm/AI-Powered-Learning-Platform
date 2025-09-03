import express from "express";
import bodyParser from "body-parser";
import { Webhook } from "svix"; 
import User  from "../models/User.js"; 
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// Middleware: Clerk requires raw body for signature verification
router.post(
  "/",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    const payload = req.body;
    const headers = req.headers;

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    let evt;
    try {
      evt = wh.verify(payload, headers); 
    } catch (err) {
      console.error("❌ Webhook verification failed:", err.message);
      return res.status(400).json({ error: "Invalid signature" });
    }

    const { type, data } = evt;
   
  
    try {
      if (type === "user.created") {
        const email = data?.email_addresses?.[0]?.email_address;
      
        if (!data || !data.id || !email || !data.first_name || !data.last_name) {
          console.log("⚠️ Skipping test user created webhook event: missing data");
          return res.json({ skipped: true });
        }
      
        await User.create({
          clerk_user_id: data.id,
          email,
          full_name: `${data.first_name} ${data.last_name}`,
        });
        console.log("✅ Synced user:", data.id);
      }
      
      if (type === "user.updated") {
        const email = data?.email_addresses?.[0]?.email_address;
      
        if (!data || !data.id || !email || !data.first_name || !data.last_name) {
          console.log("⚠️ Skipping test user updated webhook event: missing data");
          return res.json({ skipped: true });
        }
      
        await User.update(
          {
            email,
            full_name: `${data.first_name} ${data.last_name}`,
          },
          { where: { clerk_user_id: data.id } }
        );
        console.log("✅ Updated user:", data.id);
      }
      
    } catch (err) {
      console.error("❌ DB sync error:", err.message);
      res.status(500).json({ error: "DB sync failed" });
    }


  }
);

export default router;
