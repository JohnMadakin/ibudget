export default (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    sex: DataTypes.STRING,
    address: DataTypes.STRING,
    imageUrl: DataTypes.TEXT,
    dateOfBirth: DataTypes.DATE,
    userId: DataTypes.INTEGER,
  }, {});

  Profile.associate = (models) => {
    Profile.belongsTo(models.User, {
      foreignKey: 'userId',
    });
  };
  return Profile;
};
