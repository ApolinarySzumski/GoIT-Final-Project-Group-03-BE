import User from '../../service/schemas/user.js';

export const getFavoriteRecipes = async (req, res, next) => {
    const userId = req.user._id;

    try {
        const user = await User.findById(userId).populate('favorites');
        res.status(200).json(user.favorites)
    } catch (err) {
        next(err)
    }
};

export default getFavoriteRecipes;