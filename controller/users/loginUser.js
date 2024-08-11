// npm modules
import "dotenv/config";
import jwt from "jsonwebtoken";

// my modules
import User from "../../service/schemas/user.js";

const secret = process.env.SECRET;

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res
        .status(401)
        .json({ token: "", message: "Email or password is incorrect" });
      return;
    }

    const isCorrectPassword = await user.validatePassword(password);
    if (!isCorrectPassword) {
      res
        .status(401)
        .json({ token: "", message: "Email or password is incorrect" });
      return;
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
        subscribe: user.subscribe,
        avatarURL: user.avatarURL,
      },
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

export default loginUser;
