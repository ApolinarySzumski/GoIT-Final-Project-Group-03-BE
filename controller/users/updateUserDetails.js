//node modules
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";

//npm modules
import "dotenv/config";
import Jimp from "jimp";

//my modules
import User from "../../service/schemas/user.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const avatarsDir = path.join(__dirname, "../../public/avatars");

const updateUserDetails = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    let avatarURL;
    if (req.file) {
      const { path: tmpPath, originalname } = req.file;
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
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

export default updateUserDetails;
