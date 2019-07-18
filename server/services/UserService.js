import models from '../models/index';

const { User, Profile, sequelize } = models;

export default class UserService {
  /**
   * @description update verified column of a user model
   * @param {object} userObject
   * @return {array} user
   */
  static async create(userObject) {
    const { email, password, name } = userObject;
    try {
      return await sequelize.transaction(async (t) => {
        const created = await User.findOrCreate({
          where: { email },
          defaults: { email, password, name },
          transaction: t,
        });
        if (!created[1]) {
          throw new Error('Rollback initiated');
        }
        await Profile.create(
          { userId: created[0].dataValues.id }, { transaction: t },
        );
        return created;
      });
    } catch (err) {
      return err;
    }
  }

  /**
   * @description finds a user by email
   * @param {string} enail
   * @return {array} user
   */
  static async findByEmail(email) {
    return User.findOne({
      where: { email },
      include: [{
        model: Profile,
      }],
    });
  }

  /**
   * @description update verified column of a user model
   * @param {integer} userId
   * @param {boolean} verify
   * @return {array} user
   */
  static async update(userId, verify) {
    return User.update({ verified: verify }, {
      where: { id: userId },
      returning: true,
      plain: true,
    });
  }
}
