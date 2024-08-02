const updateUserDetails = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      { new: true },
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      data: {
        name: user.name,
        email: user.email,
      },
      message: "Details have been updated succesfully",
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

export default updateUserDetails;
