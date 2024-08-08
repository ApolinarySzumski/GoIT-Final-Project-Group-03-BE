import Recipe from '../../service/schemas/recipe.js';
import User from '../../service/schemas/user.js';

const getPopularRecipes = async (req, res, next) => {
    try {
        const popularRecipes = await Recipe.aggregate([
            {
                $lookup: {
                    from: User.collection.name,
                    localField: '_id',
                    foreignField: 'favorites',
                    as: 'usersWhoLike'
                }
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    description: 1,
                    image: 1,
                    favoritesCount: { $size: '$usersWhoLike'}
                }
            },
            {
                $sort: { favoritesCount: -1}
            },
            {
                $limit: 10
            }
        ]);

        if(popularRecipes.length === 0) {
            return res.status(404).json({message: 'No popular recipes found'});
        }

        res.status(200).json(popularRecipes)
    } catch (err) {
        next(err)
    }
};

export default getPopularRecipes;
