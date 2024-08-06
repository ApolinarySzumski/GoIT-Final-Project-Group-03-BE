import Ingredient from "../../service/schemas/ingredient.js";

const getIngredients = async (_, res, next) => {
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

export default getIngredients;
