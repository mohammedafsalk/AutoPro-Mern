import passwordValidator from "password-validator";

var schema = new passwordValidator();

schema.is().min(8).has().uppercase().has().lowercase().has().not().spaces();

export default function validatePassword(password) {
  return {
    status: schema.validate(password),
    message: schema.validate(password, { details: true }),
  };
}
