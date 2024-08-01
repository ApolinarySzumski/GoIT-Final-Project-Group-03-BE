// npm modules
import jwt from "jsonwebtoken";
import "dotenv/config";

// my modules
import User from "../service/schemas/user.js";

const secret = process.env.SECRET;

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

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.validatePassword(password))) {
      return res
        .status(401)
        .json({ message: "Email or password is incorrect" });
    }

    const payload = {
      id: user._id,
      email: user.email,
    };

    const token = jwt.sign(payload, secret, { expiresIn: "3d" });

    user.token = token;
    await user.save();

    res.json({
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }
    res.status(200).json({
      name: user.name,
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

export const updateUserDetails = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      data: {
        name: user.name,
        email: user.email,
      },
      message: "Details have been updated succesfully",
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(401), json({ message: "Not authorized" });
    }

    user.token = null;
    await user.save();

    res.status(204).send();
  } catch (error) {
    next(error);
    console.log(error);
  }
};
