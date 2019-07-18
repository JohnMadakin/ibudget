import errorhandler from '../helpers/errorHandler';
import UserSevice from '../services/UserService';

export default class UserAuth {
  static async validateEmailExists(req, res, next) {
    const { body: { email } } = req;
    const message = 'Username is incorrect';
    const userFound = await UserSevice.findByEmail(email);
    if (!userFound) {
      return errorhandler.sendErrorResponse({ message, statusCode: 422 }, res);
    }
    return next();
  }
}
