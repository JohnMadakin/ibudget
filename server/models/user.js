
export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    verified: DataTypes.BOOLEAN,
  }, {
    scopes: {
      withoutPassword: {
        attributes: { exclude: ['password'] },
      },
    },
  });

  User.associate = (models) => {
    User.hasOne(models.Profile);
  };
  return User;
};
