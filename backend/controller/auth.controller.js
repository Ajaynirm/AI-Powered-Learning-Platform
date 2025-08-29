import bcrypt from "bcryptjs";
import { generateToken } from "../lib/util.js";
import User from "../models/User.js";

// ✅ Signup
export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // Check if user exists
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await User.create({
      full_name: fullName,
      email,
      password: hashedPassword,
    });

    // Generate JWT
    generateToken(newUser.id, res);

    res.status(201).json({
      _id: newUser.id,
      fullName: newUser.full_name,
      email: newUser.email,
    });

  } catch (error) {
    console.error("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Get user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    generateToken(user.id, res);

    res.status(200).json({
      _id: user.id,
      fullName: user.full_name,
      email: user.email,
    });

  } catch (error) {
    console.error("Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Logout
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 }); // Clear cookie
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Check Auth
export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user); // user should be attached by middleware
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
