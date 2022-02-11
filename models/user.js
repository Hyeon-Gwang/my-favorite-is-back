module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    userID: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    nickname: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  }, {
    charset: "utf8",
    collate: "utf8_general_ci",
  });

  User.associate = (db) => {
    db.User.hasMany(db.Post);  // 한 유저는 여러 개의 포스트를 작성할 수 있다.
    db.User.belongsToMany(db.Post, { through: "Likes", as: "Liked" });  // 유저는 여러 개의 게시글에 좋아요를 할 수 있다.
  };

  return User;
};