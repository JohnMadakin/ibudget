import User from '../services/User';

export default class UserController {
  /**
   * @description user signup controller
   * @param {object} req
   * @param {object} res
   * @param {object} next
   */
  static async signup(req, res, next){
    try {
      const { body: { email } } =req;
      const result = User.create({email});
      return res.status(201).json({
        success: true,
        data: result,
      });
    }catch(err) {
      return next(err);
    }

  }
}
