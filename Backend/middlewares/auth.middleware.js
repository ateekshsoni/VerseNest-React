import ReaderModel from "../models/reader.model.js";
import writerModel from "../models/writer.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authReader = async (req, res, next) => {
  try {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const reader = await ReaderModel.findById(decoded._id).select(
        "-password"
      );
      if (!reader) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      req.reader = reader;
      return next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    // Pass errors to error handling middleware

    next(error);
  }
};

const authWriter = async (req, res, next) => {
  try {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const writer = await writerModel
        .findById(decoded._id)
        .select("-password");
      if (!writer) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      req.writer = writer;
      return next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    // Pass errors to error handling middleware

    next(error);
  }
};
export default { authReader, authWriter };
