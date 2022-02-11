module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define("image", {
      // id, createdAt, updateAt이 기본값으로 들어감
      
    }, {
      charset: "utf8",
      collate: "utf8_general_ci",
    });
  
    Image.associate = (db) => {
  
    };
  
    return Image;
  };