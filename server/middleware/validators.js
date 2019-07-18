import validator from 'validator';
import ErrorHandler from '../helpers/errorHandler';

export default class Validators {
  static validateSignupData(req, res, next) {
    const userData = req.body;
    const invalidData = [];
    Object.keys(userData).map((value) => {
      if (value === 'email' && !validator.isEmail(userData[value])) {
        invalidData.push(`${userData[value]} is an invalid email`);
      }
      if (value === 'firstName' && !validator.isEmpty(userData[value]) && !validator.isAlpha(userData[value])) {
        invalidData.push(`${userData[value]} is an invalid firstName`);
      }
      if (value === 'lastName' && !validator.isEmpty(userData[value]) && !validator.isAlpha(userData[value])) {
        invalidData.push(`${userData[value]} is an invalid lastName`);
      }
      if (value === 'password' && !validator.isByteLength(userData[value], 8)) {
        invalidData.push(`${userData[value]} is an invalid password`);
      }
      return true;
    });
    if (invalidData.length > 0) {
      const statusCode = 422;
      const message = invalidData;
      return ErrorHandler.sendErrorResponse({ message, statusCode }, res);
    }
    return next();
  }
}
