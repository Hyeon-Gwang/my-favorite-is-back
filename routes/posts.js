const express = require("express");
const models = require("../models");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");

// 메인페이지
router.get("/", async (req, res) => {
  try {
    const { tag } = req.query;

    //전체 게시글 조회
    if (!tag || tag === null || tag === undefined) {
      const posts = await models.Post.findAll({
        attributes: ["id", "title", "imageUrl", "createdAt"],
        include: [
          {
            model: models.Tag,
            attributes: ["name"],
          },
          {
            model: models.User,
            attributes: ["userID"],
          },
          {
            model: models.User,
            as: "Likers",
            attributes: ["id"],
            through: { attributes: [] },
          },
        ],
      });
      return res.json(posts);
    }

    //특정 태그 달린 게시글 조회
    const selectedTag = await models.Tag.findOne({
      where: { name: tag },
      attributes: ["name"],
      include: [
        {
          model: models.Post,
          attributes: ["id", "title", "imageUrl", "createdAt"],
          through: { attributes: [] },
          include: [
            {
              model: models.User,
              attributes: ["userID"],
            },
            {
              model: models.User,
              as: "Likers",
              attributes: ["id"],
              through: { attributes: [] },
            },
          ],
        },
      ],
    });
    if (!selectedTag) {
      return res.status(400).send({
        errorMessage: "잘못된 접근",
      });
    }
    res.json(selectedTag.posts);
  } catch (error) {
    console.error(error);
  }
});

// 게시글 상세 페이지 조회
router.get("/detail/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const detail = await models.Post.findOne({
      where: { id: postId },
      attributes: ["title", "imageUrl", "createdAt", "updatedAt"],
      include: [
        {
          model: models.Tag,
          attributes: ["name"],
          through: { attributes: [] },
        },
        {
          model: models.User,
          attributes: ["userID"],
        },
      ],
    });
    if (!detail) {
      return res.status(400).send({
        errorMessage: "잘못된 접근",
      });
    }
    return res.json(detail);
  } catch (error) {
    console.error(error);
  }
});

//내가 좋아요 한 게시글만 보기
router.get("/likes", authMiddleware, async (req, res) => {
  try {
    const { user } = res.locals;
    const mine = await models.User.findOne({
      where: { userID: user.userID },
      include: [
        {
          model: models.Post,
        },
      ],
    });
    const myLikes = await mine.getLiked({
      attributes: ["id", "title", "imageUrl", "createdAt"],
    });

    if (!myLikes) {
      return res.status(400).send({
        errorMessage: "좋아요 한 게시글이 없습니다.",
      });
    }
    return res.json(myLikes);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
