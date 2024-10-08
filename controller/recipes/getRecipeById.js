import Recipe from "../../service/schemas/recipe.js";

const getRecipeById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // const recipe = await Recipe.findById(id).populate({
    //   path: 'ingredients.id',
    //   select: 'ttl desc thb',
    // });

    const recipe = await Recipe.findById(id).populate({ path: 'ingredients.id' });
    recipe.ttl = recipe.id.ttl;
    recipe.thb = recipe.id.thb;

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.json(recipe);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export default getRecipeById;