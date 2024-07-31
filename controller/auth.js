// npm modules
// import * as jwt from "jsonwebtoken";

// my modules
import User from "../service/schemas/user.js";

export const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }

    const newUser = new User({ name, email });
    await newUser.setPassword(password);
    await newUser.save();
  } catch (error) {
    next(error);
  }
};
