//my modules
import Recipe from "../../service/schemas/recipe.js";

const deleteRecipe = (userId, recipeId) => {
  return Recipe.findOneAndDelete({ _id: recipeId, owner: userId });
};

const deleteMyRecipe = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;
  try {
    const result = await deleteRecipe(userId, id);
    res.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

export default deleteMyRecipe;
