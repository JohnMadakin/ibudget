/**
   * @description Base class that houses instance methods that are common across all controllers
   * @param {object} req
   * @param {object} res
   * @param {object} next
   */

export default class BaseController {
  static successResponse(res, message, code, data = null) {
    if (!data) {
      return res.status(code).json({
        success: true,
        message,
      });
    }
    return res.status(code).json({
      success: true,
      data,
      message,
    });
  }
}
