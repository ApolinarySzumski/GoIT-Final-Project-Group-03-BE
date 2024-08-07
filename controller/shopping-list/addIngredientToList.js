import User from '../../service/schemas/user.js';
import Ingredient from '../../service/schemas/ingredient.js';

export const addIngredientToList = async (req, res, next) => {
    const userId = req.user._id;
    const { ingredientId, quantity, measure } = req.body;

    try {
        const user = await User.findById(userId).populate('shoppingList.ingredient');
        const ingredient = await Ingredient.findById(ingredientId);

        if(!ingredient) {
            return res.status(404).json({message: 'Ingredient not found'})
        }

        const existingItemIndex = user.shoppingList.findIndex(
            item => item.ingredient._id.toString() === ingredientId.toString()
        );

        if (existingItemIndex > -1) {
            user.shoppingList[existingItemIndex].quantity += quantity;
        } else {
            user.shoppingList.push({ ingredient: ingredientId, quantity, measure });
        }

        await user.save();

        const updatedUser = await User.findById(userId).populate('shoppingList.ingredient');

        res.status(200).json(updatedUser.shoppingList);
    } catch (err) {
        next(err)
    }
};

export default addIngredientToList;