const logoutUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    user.token = null;
    await user.save();

    res.status(204).send();
  } catch (error) {
    next(error);
    console.log(error);
  }
};

export default logoutUser;
