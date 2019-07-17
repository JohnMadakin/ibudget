import jsonWebToken from 'jsonwebtoken';
import { config } from 'dotenv';
import { SECRETKEY } from '../config/config';

config();

/**
 * @description This class is for JWT token generation and verification
 */
class JWTHelper {
  /**
   * @description This function generates JWT tokens
   * @param {object} userObject
   * @param {string} duration time that a token has before becoming invalid
   * @returns {string} token
   */
  static generateToken(userObject, duration) {
    if (!userObject || !userObject.userName) {
      return false;
    }
    const token = jsonWebToken.sign({ user: userObject }, SECRETKEY,
      { expiresIn: duration });
    return token;
  }

  /**
   * @description This function verifies and decodes JWT tokens
   * @param {string} userToken
   * @returns {Object} userObject
   */
  static verifyToken(userToken) {
    if (!userToken || typeof userToken !== 'string') {
      return false;
    }
    try {
      const decodedToken = jsonWebToken.verify(userToken, SECRETKEY);
      return decodedToken;
    } catch (err) {
      return err;
    }
  }
}

export default JWTHelper;
