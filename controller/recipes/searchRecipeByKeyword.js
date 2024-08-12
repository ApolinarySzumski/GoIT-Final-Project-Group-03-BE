import Recipe from "../../service/schemas/recipe.js";

const searchRecipeByKeyword = async (req, res, next) => {
  const { keyword } = req.query;

  if (!keyword) {
    return res.status(400).json({ message: "Keyword is required" });
  }

  try {
    const results = await Recipe.find({ title: new RegExp(keyword, "i") });

    // Zwracamy status 200, nawet jeśli `results` jest puste
    res.status(200).json({
      message: results.length === 0 ? "No recipes found" : "Recipes found",
      data: { results },
    });
  } catch (error) {
    next(error);
  }
};

export default searchRecipeByKeyword;
