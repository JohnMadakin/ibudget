import BaseController from './BaseController';

import User from '../services/User';
import UserHelpers from '../helpers/userHelpers';
import errorhandler from '../helpers/errorHandler';
import SendMail from '../helpers/sendEmail';
import emailTemplate from '../helpers/emailTemplate';

export default class AuthController extends BaseController {
  /**
   * @description user signup controller
   * @param {object} req
   * @param {object} res
   * @param {object} next
   */
  async signup(req, res, next) {
    try {
      const {
        body: {
          email, password, firstName, lastName,
        },
      } = req;
      const result = await User.create({
        email,
        password: await UserHelpers.hashPassword(password),
        name: `${firstName.trim()} ${lastName.trim()}`,
      });
      if (result[1]) {
        const message = 'Signup Successfull';
        const appUrl = '';
        SendMail.send(email, emailTemplate.verification, appUrl);
        super.successResponse(res, message, 201);
      }
      const message = 'email already exists';
      const statusCode = 422;
      return errorhandler.sendErrorResponse({ message, statusCode }, res);
    } catch (err) {
      return next(err);
    }
  }

  /**
   * @description user signup controller
   * @param {object} req
   * @param {object} res
   * @param {object} next
   */
  async signin(req, res, next) {
    try {
      const { body: { email, password } } = req;
      let message = 'Username is incorrect';
      let statusCode = 422;

      const userFound = await User.findByEmail(email);

      if (!userFound) {
        return errorhandler.sendErrorResponse({ message, statusCode }, res);
      }
      const { dataValues: { password: hashedPassword, verified } } = userFound;
      const isPasswordCorrect = await
      UserHelpers.checkHashedPassword(password, hashedPassword);

      if (!isPasswordCorrect) {
        message = 'Password is incorrect';
        return errorhandler.sendErrorResponse({ message, statusCode }, res);
      }

      if (!verified) {
        statusCode = 403;
        message = 'User is not yet verified';
        return errorhandler.sendErrorResponse({ message, statusCode }, res);
      }
      message = 'Login Successfull';
      return super.successResponse(res, message, 200);
    } catch (err) {
      return next(err);
    }
  }
}
