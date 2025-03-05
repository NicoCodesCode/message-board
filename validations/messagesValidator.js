const { body } = require("express-validator");

const lengthErr = "must be between 1 and 30 characters";
const emptyErr = "can't be empty";

exports.validateMessage = [
  body("messageTitle")
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage(`Title ${lengthErr}`),
  body("messageText").trim().notEmpty().withMessage(`Message ${emptyErr}`),
  body("authorName")
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage(`Author name ${lengthErr}`),
];
