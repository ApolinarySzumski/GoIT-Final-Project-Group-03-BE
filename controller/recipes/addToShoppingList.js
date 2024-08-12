import Ingredient from "../../service/schemas/ingredient.js";
import User from "../../service/schemas/user.js";

const addToShoppingList = async (req, res, next) => {
  const userId = req.user._id;
  const { ingredientId, measure } = req.body;
  console.log("req.body: ", req.body);
  console.log("ingredientId: ", ingredientId);
  console.log("measure: ", measure);

  try {
    const user = await User.findById(userId).populate(
      "shoppingList.ingredient",
    );
    const ingredient = await Ingredient.findById(ingredientId);

    if (!ingredient) {
      return res.status(404).json({ message: "Ingredient not found" });
    }

    const existingItemIndex = user.shoppingList.findIndex(
      (item) => item.ingredient._id.toString() === ingredientId.toString(),
    );

    if (existingItemIndex > -1) {
      user.shoppingList[existingItemIndex].measure += measure;
    } else {
      user.shoppingList.push({
        ingredient: ingredientId,
        measure: measure,
      });
    }

    await user.save();

    const updatedUser = await User.findById(userId).populate(
      "shoppingList.ingredient",
    );

    res.status(200).json(updatedUser.shoppingList);
  } catch (err) {
    next(err);
  }
};

export default addToShoppingList;
