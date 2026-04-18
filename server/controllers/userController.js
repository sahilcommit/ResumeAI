import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Resume from "../models/Resume.js";
import { ensureDemoResumeForUser } from "../utils/demoResume.js";

const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

const strongPasswordMessage =
  "Password must be at least 8 characters and include uppercase, lowercase, a number, and a special character.";

const generateToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Normalize early so signup/login behave consistently across uppercase/lowercase input.
    const trimmedName = String(name || "").trim();
    const normalizedEmail = String(email || "")
      .trim()
      .toLowerCase();

    if (!trimmedName || !normalizedEmail || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!strongPasswordRegex.test(password)) {
      return res.status(400).json({ message: strongPasswordMessage });
    }

    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name: trimmedName,
      email: normalizedEmail,
      password: hashedPassword,
    });

    try {
      // Every new account gets one editable demo resume.
      // If demo creation fails, we remove the new user so signup does not leave partial data behind.
      await ensureDemoResumeForUser(newUser._id);
    } catch (demoError) {
      await User.findByIdAndDelete(newUser._id);
      throw demoError;
    }

    const token = generateToken(newUser._id);
    newUser.password = undefined;

    return res
      .status(201)
      .json({ message: "User created successfully", token, user: newUser });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = String(email || "")
      .trim()
      .toLowerCase();

    const user = await User.findOne({ email: normalizedEmail });

    if (!user || !user.comparePassword(password)) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id);
    user.password = undefined;

    return res.status(200).json({ message: "Login successfully", token, user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.password = undefined;

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getUserResumes = async (req, res) => {
  try {
    // Dashboard reads everything from this one list endpoint, including demo resumes.
    const resumes = await Resume.find({ userId: req.userId });
    return res.status(200).json({ resumes });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
