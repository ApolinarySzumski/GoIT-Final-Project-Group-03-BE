import User from "../../service/schemas/user.js";

const getMyFavoriteRecipes = async (req, res, next) => {
  const userId = req.user._id;
  const { page = 1, limit = 4} = req.query

  try {
    const user = await User.findById(userId).populate({
      path: "favorites",
      options: {
        skip: (page - 1) * limit,
        limit: parseInt(limit),
      },
    });

    const totalRecipes = user.favorites.length;
    const totalPages = Math.ceil(totalRecipes/limit);

    if (totalRecipes === 0) {
      return res.status(404).json({ message: "No favorite recipes found" });
    }

    res.status(200).json({
      favorites: user.favorites,
      totalPages,
      currentPage: parseInt(page)
    });
  } catch (err) {
    next(err);
  }
};

export default getMyFavoriteRecipes;
