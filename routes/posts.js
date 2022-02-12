const express = require("express");
const models = require("../models");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");

// 메인페이지
router.get("/", async (req, res) => {
  try {
    const { tag } = req.query;
    //전체 게시글 조회
    if(!tag||tag===null||tag===undefined) {
      const posts = await models.Post.findAll({})
      return res.json({posts})
    }
      const TAG = await models.Tag.findAll({
        where: {name : tag}
      })
      const selectedTag = await TAG.getPostTag.findAll({    //PostTag에서 찾는다
        where: { name: tag }, //name과 tags가 같은것만
        include: [
          {
            model: models.Post, //post를 가져옴
          },
        ],
      });
       res.json({ selectedTag });
    
  } catch (error) {
    console.error(error);
  }
});

// 게시글 상세 페이지 조회
router.get("/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const detail = await models.Post.findOne({
      where: { id: postId },
      attributes: ["title", "imageUrl", "userId", "createdAt", "updatedAt"],
      include: [
        {
          model: models.Tag,
          attributes: ["name"],
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


router.get("/likes", async (req, res) => {
  try {
    const { postId } = req.params;
    const detail = await models.Post.findOne({
      where: { id: postId },
      attributes: ["title", "imageUrl", "userId", "createdAt", "updatedAt"],
      include: [
        {
          model: models.Tag,
          attributes: ["name"],
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



module.exports = router;
