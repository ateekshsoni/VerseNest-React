// Import dependencies
import express from "express";
import { body } from "express-validator";
import readerController from "../controllers/reader.controller.js";

// Create a new Express router instance
const router = express.Router();

// Route for registering a new reader
// Validates input fields using express-validator
router.post(
  "/register",
  [
    body("fullName").notEmpty().withMessage("Full name is required"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("genreFocus")
      .notEmpty()
      .withMessage("Genre focus is required")
      .isIn([
        "Lyrical",
        "Narrative",
        "Sonnet",
        "Haiku",
        "Fantasy",
        "Free Verse",
        "Other",
      ])
      .withMessage("Invalid genre focus"),
    body("moodPreferences")
      .optional()
      .isArray()
      .withMessage("Mood preferences must be an array of strings"),
  ],
  readerController.registerReader
);
router.post("/login",[
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
], readerController.loginReader);


// Export the router to be used in the main app
export default router;
