//my modules
import Recipe from "../../service/schemas/recipe.js";

const addRecipe = async (userId, recipeData) => {
  try {
    const recipe = new Recipe({ ...recipeData, owner: userId });
    return await recipe.save();
  } catch (error) {
    throw error;
    console.log(error);
  }
};

const addMyRecipe = async (req, res, next) => {
  const {
    title,
    description,
    category,
    time,
    ingredients,
    instructions,
    // thumb,
    // preview,
  } = req.body;
  const userId = req.user._id;
  try {
    const result = await addRecipe(userId, {
      title,
      description,
      category,
      time,
      ingredients,
      instructions,
      // thumb,
      // preview,
    });
    res.json({
      message: "Recipe added successfully",
      data: { recipe: result },
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

export default addMyRecipe;
