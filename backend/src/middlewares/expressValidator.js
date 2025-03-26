import { body, validationResult } from "express-validator";

export const validateUser = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters long"),

  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ min: 2 })
    .withMessage("Last name must be at least 2 characters long"),

    body("gender")
    .trim()
    .notEmpty()
    .withMessage("Gender  is required")
    .isLength({ min: 2 })
    .withMessage("Select any gender"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  body("mobilenumber")
    .trim()
    .notEmpty()
    .withMessage("Mobile number is required")
    .isNumeric()
    .withMessage("Mobile number must contain only numbers")
    .isLength({ min: 10, max: 10 })
    .withMessage("Mobile number must be exactly 10 digits"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
