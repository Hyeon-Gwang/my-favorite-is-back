module.exports = (sequelize, DataTypes) => {
    const Tag = sequelize.define("tag", {
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
    }, {
      charset: "utf8",
      collate: "utf8_general_ci",
    });
  
    Tag.associate = (db) => {
      db.Tag.belongsToMany(db.Post, { through: "PostTag" });  // 하나의 태그는 여러 포스트에 달릴 수 있다.
    };
  
    return Tag;
  };