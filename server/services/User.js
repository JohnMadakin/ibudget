import models from '../models/index';

const { User } = models;

export default class Users {
  static async create(userObject) {
    const { email, password, name } = userObject;
    return User.findOrCreate({
      where: { email },
      defaults: { email, password, name },
    });
  }

  static async findByEmail(email) {
    return User.findOne({
      where: { email },
    });
  }
}
