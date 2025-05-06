import express from "express";
import { body } from "express-validator";
import writerController from "../controllers/writer.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// Route for registering a new writer
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
      .isArray()
      .withMessage("Genre focus must be an array of strings")
      .custom((arr) =>
        arr.every((g) =>
          [
            "Lyrical",
            "Narrative",
            "Sonnet",
            "Haiku",
            "Fantasy",
            "Free Verse",
            "Other",
          ].includes(g)
        )
      )
      .withMessage("Invalid genre focus"),
    body("penName")
      .optional()
      .isString()
      .withMessage("Pen name must be a string"),
    body("shortBio")
      .optional()
      .isString()
      .isLength({ min: 10, max: 500 })
      .withMessage("Bio must be 10-500 characters long"),
  ],
  writerController.registerWriter
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email format"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  writerController.loginWriter
);

router.get(
  "/profile",
  authMiddleware.authWriter,
  writerController.getWriterProfile
);
// Export the router to be used in the main app
export default router;
