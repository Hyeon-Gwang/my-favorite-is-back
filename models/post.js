module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("post", {
    // id, createdAt, updateAt이 기본값으로 들어감
    
  }, {
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
  });

  Post.associate = (db) => {

  };

  return Post;
};