import Joi from "joi";
class UserValidator {
  static register() {
    return Joi.object({
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,16}$")).required().messages({
        "string.pattern.base": "Password should be between 3 to 16 characters",
      }),
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .messages({
          "string.email": "Email is invalid",
        }),
    });
  }
  static login() {
    return Joi.object({
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,16}$")).required().messages({
        "string.pattern.base": "Password should be between 3 to 16 characters",
      }),
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .messages({
          "string.email": "Email is invalid",
        }),
    });
  }
}
export default UserValidator;
