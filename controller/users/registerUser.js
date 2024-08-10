//my modules
import User from "../../service/schemas/user.js";
import Joi from "joi";

const userValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
  }),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[!@#$%^&*(),.?\":{}|<>]).*$"))
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 8 characters long",
      "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    }),
});

const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const { error } = userValidationSchema.validate({ name, email, password });

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }

    const newUser = new User({ name, email });
    await newUser.setPassword(password);
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

export default registerUser;
