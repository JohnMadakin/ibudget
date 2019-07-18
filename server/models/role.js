/* eslint-disable func-names */

export default (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    name: DataTypes.STRING,
  }, {});

  /* eslint-disable-next-line */
  Role.associate = function (models) {
    // associations can be defined here
  };
  return Role;
};
