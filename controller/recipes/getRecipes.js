import Recipe from '../../service/schemas/recipe.js'

const getRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find().select('_id title category preview');
    res.json(recipes);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default getRecipes;