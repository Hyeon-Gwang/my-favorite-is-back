module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("post", {
    title: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  }, {
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
  });

  Post.associate = (db) => {
    db.Post.belongsTo(db.User);  // 하나의 포스트에는 한 명의 작성자만 있다.
    db.Post.belongsToMany(db.User, { through: "Likes", as: "Likers" });  // 하나의 포스트에는 여러 명의 유저가 좋아요를 할 수 있다.
    db.Post.belongsToMany(db.Tag, { through: "PostTag" });  // 하나의 포스트에는 여러 개의 태그가 있을 수 있다.
  };

  return Post;
};
