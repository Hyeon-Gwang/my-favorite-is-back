module.exports = (sequelize, DataTypes) => {
    const Tag = sequelize.define("tag", {
      // id, createdAt, updateAt이 기본값으로 들어감
      
    }, {
      charset: "utf8",
      collate: "utf8_general_ci",
    });
  
    Tag.associate = (db) => {
  
    };
  
    return Tag;
  };