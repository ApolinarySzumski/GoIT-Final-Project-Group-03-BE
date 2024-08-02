//my modules
import Recipe from "../../service/schemas/recipe.js";

const getRecipes = (filter, skip, limit) => {
  return Recipe.find(filter).skip(skip).limit(Number(limit));
};

const getMyRecipes = async (req, res, next) => {
  const { page = 1, limit = 4 } = req.query;
  const skip = (page - 1) * limit;
  const userId = req.user._id;
  const filter = { owner: userId };
  if (!filter) {
    return res.json({ message: "No own recipes in the database" });
  }
  try {
    const results = await getRecipes(filter, skip, limit);
    res.json({ data: { results } });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

export default getMyRecipes;
