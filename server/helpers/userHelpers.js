import bcrypt from 'bcryptjs';

export default class UserHelpers {
  /**
   * @description hashes a string
   * @param {string} password
   * @returns {string} hash
   */
  static async hashPassword(password) {
    const salt = await bcrypt.genSalt(13);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
  }

  /**
   * @description compares password and hash
   * @param {string} password
   * @param {string} hashedPassword
   * @returns {boolean}
   */
  static async checkHashedPassword(password, hashedPassword) {
    const checkedhashed = await bcrypt.compare(password, hashedPassword);
    return checkedhashed;
  }
}
