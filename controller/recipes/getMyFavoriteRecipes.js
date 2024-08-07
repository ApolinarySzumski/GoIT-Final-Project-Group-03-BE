import User from "../../service/schemas/user.js";

const getMyFavoriteRecipes = async (req, res, next) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId).populate("favorites");

    if (user.favorites.length === 0) {
      return res.status(200).json({ message: "No favorite recipes found" });
    }

    res.status(200).json(user.favorites);
  } catch (err) {
    next(err);
  }
};

export default getMyFavoriteRecipes;
