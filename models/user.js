module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    // id, createdAt, updateAt이 기본값으로 들어감
    email: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    }
  }, {
    charset: "utf8",
    collate: "utf8_general_ci",
  });

  User.associate = (db) => {

  };

  return User;
};