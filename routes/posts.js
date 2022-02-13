const express = require("express");
const models = require("../models");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");

// 메인페이지
router.get("/", async (req, res) => {
  try {
    const { tag } = req.query;
    console.log(tag)
    //전체 게시글 조회    완성!
    if(!tag||tag===null||tag===undefined) {
      const posts = await models.Post.findAll({
        include: [{
          model: models.Tag,
          through: { attributes:[]},
        }]
      })
      return res.json(posts)
    }
    //특정 태그 달린 게시글 조회    완성!
      const selectedTag = await models.Tag.findOne({
        where: {name : tag},
        include: [{
          model: models.Post,
          through: { attributes:[]},
        }],
      })
       res.json( selectedTag.posts );
  } catch (error) {
    console.error(error);
  }
});

// 게시글 상세 페이지 조회  완성!
router.get("/detail/:postId", async (req, res) => {        //   /:postId 에서 /detail/:postId로 변경
  try {
    const { postId } = req.params;
    const detail = await models.Post.findOne({
      where: { id: postId },
      attributes: ["title", "imageUrl",  "createdAt", "updatedAt"],
      include: [
        {
          model: models.Tag,
          attributes: ["name"],
          through: { attributes:[]},
        },
        {
          model: models.User,
          attributes:["nickname"]
        },
      ],
    });
    return res.json(detail);
  } catch (error) {
    console.error(error);
  }
});

//내가 좋아요 한 게시글만 보기   완성!
router.get("/likes",authMiddleware, async (req, res) => {        // /likes가 /:postId 에서 먼저 인식되므로 상세 페이지 조회 url을 변경
  try {
    const { user } = res.locals;
    const mine = await models.User.findOne({
      where: { userID: user[0].dataValues.userID },
      include:[
        {
           model : models.Post,
          },
      ],
    });
    const myLikes = await mine.getLiked({
      attributes: ["id", "title", "imageUrl", "createdAt"],
    });
    return res.json(myLikes);
  } catch (error) {
    console.error(error);
  }
});



module.exports = router;
