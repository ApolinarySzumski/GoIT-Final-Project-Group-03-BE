// my modules
import Ingredient from "../service/schemas/ingredient.js";
import Recipe from "../service/schemas/recipe.js";

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
//   try {
//     const { ingredient } = req.query;

//     console.log(ingredient);

//     if (!ingredient) {
//       return res.status(400).json({ message: "Ingredient is required" });
//     }

//     const recipes = await Recipe.find({
//       ingredients: { $regex: ingredient, $options: "i" },
//     });

//     console.log(recipes);

//     if (recipes.length === 0) {
//       return res.status(404).json({ message: "No recipes found" });
//     }

//     res.json(recipes);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
//   const { ingredient } = req.params;
//   console.log(ingredient);
//   try {
//     const recipes = await Recipe.find({});
//     // console.log(recipes);
//     const ingredients = await Ingredient.find({});
//     // console.log(ingredients);
//     const ingredientObject = ingredients.find((i) => i.ttl === ingredient);
//     // console.log(ingredientObject);
//     const ingredientObjectId = ingredientObject._id;
//     // console.log(ingredientObjectId);
//     const ingredientsFromRecipes = recipes.flatMap(
//       (recipe) => recipe.ingredients,
//     );
//     console.log(ingredientsFromRecipes);
//     const arrayOfIngredientsIdToCompare = ingredientsFromRecipes.find(
//       (recipe) => recipe.id === ingredientObjectId,
//     );
//     console.log(arrayOfIngredientsIdToCompare);
//     res.json(arrayOfIngredientsIdToCompare);
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }

export const getRecipesByIngredient = async (req, res, next) => {
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
