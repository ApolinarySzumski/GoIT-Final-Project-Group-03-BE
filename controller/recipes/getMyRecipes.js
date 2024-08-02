//my modules
import Recipe from "../../service/schemas/recipe.js";

const getRecipes =

const getMyRecipes = async (req, res, next) => {
  try {
    // code
     res.json({ message: "OK" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default getMyRecipes;