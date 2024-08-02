// my modules
import Ingredient from "../service/schemas/ingredient.js";
import Recipe from "../service/schemas/recipe.js";

export const getRecipesByIngredient = async (req, res, next) => {
  const { ingredient } = req.params;
  console.log(ingredient);
  try {
    const recipes = await Recipe.find({});
    const ingredientName = await Ingredient.findOne({ ttl: ingredient });
    console.log(ingredientName);
    const ingredientNameId = ingredientName._id;
    console.log(ingredientNameId);
    // const recipesWithIngredient = recipes.filter(
    //   (r) => r.ingredients[0].id === ingredientNameId,
    // );

    // const recipesWithIngredient = recipes
    //   .map((recipe) => recipe.ingredients)[0]
    //   .filter((element) => element.id === ingredientNameId);

    const afterMap = recipes.map((recipe) => recipe.ingredients)[0];

    if (afterMap === []) {
      return res.status(404).json({
        message: `Not found any recipes with ${ingredient} in database`,
      });
    }

    res.json(afterMap);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const getIngredients = async (_, res, next) => {
  try {
    const ingredients = await Ingredient.find({});
    const ingredientsList = ingredients.map((i) => i.ttl);

    if (!ingredients) {
      return res
        .status(404)
        .json({ message: "Not found any ingredients in database" });
    }

    res.json(ingredientsList);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
