import Recipe from '../../service/schemas/recipe.js'

const getRecipesByCategory = async (req, res, next) => {
  const { category } = req.params;
  try {
    const recipes = await Recipe.find({ category }).select('_id title category preview').limit(8);

    if (recipes.length === 0) {
      return res.status(404).json({ message: `No recipes found for ${category} category`})
    }

    res.json(recipes);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export default getRecipesByCategory;
