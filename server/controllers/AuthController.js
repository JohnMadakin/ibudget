import BaseController from './BaseController';

import UserService from '../services/UserService';
import UserHelpers from '../helpers/userHelpers';
import errorhandler from '../helpers/errorHandler';
import emailTemplate from '../helpers/emailTemplate';
import JWTHelper from '../helpers/jwtHelper';

const duration = 360;

export default class AuthController extends BaseController {
  constructor(linkUrl) {
    super(linkUrl);
    this.signup = this.signup.bind(this);
    this.verifyEmail = this.verifyEmail.bind(this);
  }

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
          email, password: userPassword, firstName, lastName,
        },
      } = req;
      const result = await UserService.create({
        email,
        password: await UserHelpers.hashPassword(userPassword),
        name: `${firstName.trim()} ${lastName.trim()}`,
      });
      if (result[1]) {
        const message = 'Signup Successfull. Please Verify your email address';
        const userData = UserHelpers.stripPassword(result[0]);
        const token = JWTHelper.generateToken(userData, duration);
        this.linkUrl = `${this.linkUrl}?token=${token}&email=${email}`;
        super.sendNotificationEmail(userData.email, emailTemplate.verification);
        return super.successResponse(res, message, 201);
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
      let message = '';
      let statusCode = 422;

      const userFound = await UserService.findByEmail(email);

      const { dataValues: { password: hashedPassword, verified } } = userFound;
      const isPasswordCorrect = await
      UserHelpers.checkHashedPassword(password, hashedPassword);

      if (!isPasswordCorrect || !verified) {
        message = !isPasswordCorrect ? 'Password is incorrect' : 'User is not yet verified';
        statusCode = !verified ? 403 : 422;
        return errorhandler.sendErrorResponse({ message, statusCode }, res);
      }
      const userDetails = UserHelpers.stripPassword(userFound);
      const token = JWTHelper.generateToken(userDetails, duration);
      message = 'Login Successfull';
      return super.successResponse(res, message, 200, token);
    } catch (err) {
      return next(err);
    }
  }

  /**
   *@description this function verify the email of a user
   * @param {object} req request to the sent
   * @param {object} res respond gotten form server
   * @param {object} next  callback funtion
   * @returns {object} an object when the email is successfully verified
   */
  async verifyEmail(req, res, next) {
    const { query: { token, email } } = req;
    let message = 'Email successfully confirmed';
    let statusCode = 400;
    try {
      const decodedToken = JWTHelper.verifyToken(token);

      if (decodedToken.message) {
        const userFound = await UserService.findByEmail(email);
        const newToken = JWTHelper.generateToken(userFound.dataValues, duration);
        this.linkUrl = `${process.env.VERIFYEMAIL_URL}?token=${newToken}&email=${email}`;
        super.sendNotificationEmail(email, emailTemplate.verification);
        message = 'Token has Expired. A new verification link have been sent';
        return errorhandler.sendErrorResponse({ message, statusCode }, res);
      }

      const { user: { id, email: userEmail } } = decodedToken;
      const verifiedUser = await UserService.update(id, true);
      const userToken = JWTHelper.generateToken(verifiedUser, duration);
      statusCode = 200;
      super.sendNotificationEmail(userEmail, emailTemplate.confirmation);
      return super.successResponse(res, message, statusCode, userToken);
    } catch (err) {
      return next(err);
    }
  }
}
