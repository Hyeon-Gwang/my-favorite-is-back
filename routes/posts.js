const express = require("express");
const models = require("../models");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");

// 메인페이지
router.get("/", authMiddleware, async (req, res) => {
  try {
    // 좋아요 누른 게시글 조회
    const { likes } = req.query; //쿼리에서 likes가져옴
    const { user } = res.locals; //로컬스토리지에서 현재 로그인한 user 가져옴
    if (likes === true) {   // posts?likes=true 일 때,
      const USER = await models.User.findOne({
        where: { id : user.id }
      })
      const likePosts = await USER.getLikes.findAll({   //Likes에서 찾는다
        where: { Likers: id }, //Likers가 현재 로컬스토리지에 있는 user와 일치하는것들만
      });
      return res.json({ likePosts });
    }

    //특정태그가 달린 게시글 조회
    const { tags } = req.query; //쿼리에서 tags 가져옴
    if (tags.length != 0) {   //태그에 ~~한 경우가 아니면
      const TAG = await models.Tag.findAll({
        where: {name : tags}
      })
      const selectedTag = await TAG.getPostTag.findAll({    //PostTag에서 찾는다
        where: { name: tags }, //name과 tags가 같은것만
        include: [
          {
            model: models.Post, //post를 가져옴
          },
        ],
      });
      return res.json({ selectedTag });
    }

    // 전체 게시글 조회
    const posts = await models.Post.findAll({}); //위 경우들이 아니면 post에서 모든 데이터 가져옴
    res.json(posts);
  } catch (error) {
    console.error(error);
  }
});

// 게시글 상세 페이지 조회
router.get("/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const detail = await models.Post.findAll({
      where: { id: postId },
      attributes: [],
      include: [
        {
          model: models.Tag,
          attributes: ["name"],
        },
      ],
    });
    return res.json(detail);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
