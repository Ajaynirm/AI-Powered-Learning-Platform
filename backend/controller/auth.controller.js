import bcrypt from "bcrypt";
import User from "../models/User.js";
import { generateToken } from "../middleware/auth.middleware.js";
import passport from "passport";



export const register = async (req, res) => {

  try {
      const { full_name, email, password } = req.body;

    if(!full_name|| !email || !password){
      return res.status(500).json({message: `Missing fields... `});
    } 

    const  existing = await User.findOne( {where :{email}});

    if (existing) return res.status(400).json({ message: "Email exists" });
   
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ full_name, email, password: hashed });

     // Generate JWT for this user
     const token = generateToken(user);

      // Set cookie → httpOnly prevents JS access; secure → HTTPS only
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // only HTTPS in prod
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({ message: "User registered",user,token});
  } catch (error) {
    console.log("errorrs ");
    return res.status(500).json({ message: "Internal server error " });
  }
};

export const login = async (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
   
    if (err) return res.status(500).json({ message: "Internal error" } );
    if (!user) return res.status(401).json({ message: info?.message || "Unauthorized" });
    

    const token = generateToken(user);

      // Set cookie → httpOnly prevents JS access; secure → HTTPS only
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // only HTTPS in prod
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

    return res.status(200).json({ message: "Login successful",user} );
  })(req, res, next);
};

export const checkAuth = async (req, res) => {
  try {
    // req.user comes from passport JWT strategy
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    return res.status(200).json(req.user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const logout = async (req, res) => {
  try {
    // If somehow req.user doesn't exist (invalid token), block logout
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized. No valid token." });
    }

    // Clear JWT cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      sameSite: "strict",
    });

    return res.status(200).json({ 
      message: "Logged out successfully",
      user: null 
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};



