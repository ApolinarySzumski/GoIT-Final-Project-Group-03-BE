//npm modules
import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.min": "Name must be at least 3 characters long",
    "string.empty": "Name field is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email",
    "string.empty": "Email field is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters long",
    "string.empty": "Password field is required",
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email",
    "string.empty": "Email field is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters long",
    "string.empty": "Password field is required",
  }),
});

const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  };
};

export default validateBody;
