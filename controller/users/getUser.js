const getUser = async (req, res, next) => {
  try {
    const user = req.user;
    res.json({user});
  } catch (error) {
    next(error);
    console.log(error);
  }
};

export default getUser;
