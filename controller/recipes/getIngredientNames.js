import Ingredient from "../../service/schemas/ingredient.js";

const getIngredients = async (_, res, next) => {
  try {
    const ingredients = await Ingredient.find({});

    if (ingredients.length === 0) {
      return res
        .status(404)
        .json({ message: "Not found any ingredients in database" });
    }

    const ingredientsList = ingredients.map((i) => ({
      _id: i._id,
      ttl: i.ttl,
      thb: i.thb
    }));

    res.json(ingredientsList);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default getIngredients;
