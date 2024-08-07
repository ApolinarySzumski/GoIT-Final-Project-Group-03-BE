import User from '../../service/schemas/user.js';

export const removeIngredientFromList = async (req, res, next) => {
    const userId = req.user._id;
    const { ingredientId } = req.body;

    try {
        const user = await User.findById(userId);

        if (!ingredientId) {
            return res.status(400).json({ message: 'Ingredient ID is required' });
        }

        const existingItemIndex = user.shoppingList.findIndex(
            item => item.ingredient._id.toString() === ingredientId.toString()
        );

        if (existingItemIndex === -1) {
            return res.status(400).json({ message: 'Ingredient not found in your shopping list' });
        }

        user.shoppingList = user.shoppingList.filter(
            item => item.ingredient.toString() !== ingredientId.toString()
        );

        await user.save();
        res.status(200).json({ message: 'Ingredient removed from shopping list' });
    } catch (err) {
        next(err)
    }
};

export default removeIngredientFromList;