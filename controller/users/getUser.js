const getUser = async (req, res, next) => {
  try {
    const user = req.user;

    res.json({
      name: user.name,
      email: user.email,
      subscribe: user.subscribe,
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

export default getUser;
