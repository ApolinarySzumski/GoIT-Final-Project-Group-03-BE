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
    const userId = req.user._id;

    let avatarURL;
    if (req.file) {
      const { path: tmpPath, originalname } = req.file;

      await fs.mkdir(avatarsDir, { recursive: true });

      const img = await Jimp.read(tmpPath);
      const avatarName = `${userId}-${Date.now()}-${originalname}`;
      const avatarPath = path.join(avatarsDir, avatarName);
      await img.resize(256, 256).writeAsync(avatarPath);

      avatarURL = path.join("avatars", avatarName);

      await fs.rename(tmpPath, avatarPath);
    }

    const updatedData = { name, email, avatarURL };
    if (avatarURL) {
      updatedData.avatarURL = `${process.env.V_URL}${
        process.env.MAIN_PORT || 8000
      }/${avatarURL}`;
    }

    const user = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      data: {
        name: user.name,
        email: user.email,
        avatarURL: user.avatarURL,
      },
      message: "Details have been updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default updateUserDetails;
