import User from "../../service/schemas/user.js";

const getShoppingList = async (req, res, next) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId).populate(
      "shoppingList.ingredient",
    );

    res.status(200).json(user.shoppingList);
  } catch (err) {
    next(err);
  }
};

export default getShoppingList;
