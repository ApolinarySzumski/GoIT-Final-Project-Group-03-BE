import Category from '../../service/schemas/categoriesList.js'

const getCategoryNames = async (req, res, next) => {
  try {
    const categories = await Category.find().select("title").sort({ title: 1 });

    res.json(categories);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export default getCategoryNames;
