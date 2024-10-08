// my modules
import Ingredient from "../../service/schemas/ingredient.js";
import Recipe from "../../service/schemas/recipe.js";

const getRecipesByIngr = async (ingredientTitle) => {
  const ingredient = await Ingredient.findOne({
    ttl: { $regex: new RegExp(ingredientTitle, "i") },
  });

  if (!ingredient) {
    return null;
  }

  const recipes = await Recipe.find({ "ingredients.id": ingredient._id });
  return recipes;
};

const getRecipesByIngredient = async (req, res, next) => {
  const { ingredient } = req.params;

  try {
    const results = await getRecipesByIngr(ingredient);

    if (!results || results.length === 0) {
      res.json({
        message: "There is no receipes in the database with this ingredient",
      });
    } else {
      return res.json({ data: results });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default getRecipesByIngredient;
