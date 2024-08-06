import Recipe from "../../service/schemas/recipe.js";

const searchRecipeByKeyword = async (req, res, next) => {
  const { keyword } = req.query;

  if (!keyword) {
    return res.status(400).json({ message: "Keyword is required" });
  }
  try {
    const results = await Recipe.find({ title: new RegExp(keyword, "i") });
    if (results.length === 0) {
      return res.status(404).json({ message: "No recipes found" });
    }
    res.json({ data: { results } });
  } catch (error) {
    next(error);
  }
};

export default searchRecipeByKeyword;
