import Recipe from "../../service/schemas/recipe.js";
import User from "../../service/schemas/user.js";

const unsetMyFavoriteRecipe = async (req, res, next) => {
  const userId = req.user._id;
  const { recipeId } = req.body;

  try {
    if (!recipeId) {
      return res.status(400).json({ message: "Recipe ID is required" });
    }

    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const user = await User.findById(userId);

    if (!user.favorites.includes(recipeId)) {
      return res.status(400).json({ message: "Recipe is not in favorites" });
    }

    user.favorites = user.favorites.filter((id) => id.toString() !== recipeId);
    await user.save();
    res.status(200).json({ message: "Recipe removed from favorites" });
  } catch (err) {
    next(err);
  }
};

export default unsetMyFavoriteRecipe;
