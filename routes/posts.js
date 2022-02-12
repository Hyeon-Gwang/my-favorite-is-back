const express = require("express");
const Post = require("../models/post");
const Tag = require("../models/tag");
const User = require("../models/user");
const router = express.Router();

// 메인페이지
router.get("/", async (req, res, next) => {
  try {
    // 좋아요 누른 게시글 조회
  //   const { likes } = req.query;
  //   const { user } = res.locals;
  //   const likePosts;
  //   if (likes==true){
  //   const likePosts = await Post.findAll({      //해당하는 게시글들을 가져온다.
  //     where: {Likers : user}           
  //   })
  //   res.json({ likePosts });
  // }

  // 전체 게시글 조회
    const posts = await Post.findAll({});
    res.json(posts);
    
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 게시글 상세 페이지 조회
router.get("/:postId", async (req, res, next) => {
  try {
    const { postId } = req.params;
    const detail = await Post.findAll({
      where: { id: postId },
      attributes: [],
      include: [
        {
          model: Tag,
          attributes: ["name"],
        },
      ],
    });
    return res.json(detail);
  } catch (error) {
    console.error(error);
    next(error);
  }
});




// 특정 태그가 달린 게시글 조회
router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.findAll().sort("-createdAt");
    res.json({ posts });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
