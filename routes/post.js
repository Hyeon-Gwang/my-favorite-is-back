const express = require("express");

const { Post, Tag, User } = require("../models");

const router = express.Router();

// 이미지 업로드 POST /api/post/image
router.post("/image", async (req, res, next) => {
  try {

  } catch(error) {
    console.error(error);
    next(error);
  };
});

// 포스트 작성 POST /api/post/new
router.post("/new", async (req, res, next) => {
  try {
    const { title, imageUrl, tags } = req.body;

    const post = await Post.create({
      title,
      imageUrl,
      userId: 1,  // test용으로 1번 유저 삽입
    });

    const tagCheck = await Promise.all(tags.map(tag => Tag.findOrCreate({
      where: { name: tag },
    }))); // result [ [tag {}, true], [tag {}, false] ]
    await post.addTags(tagCheck.map(tag => tag[0]));

    const newPost = await Post.findOne({
      where: { id: post.id },
      attributes: ["id", "title", "imageUrl"],
      include: [{
        model: Tag,
        attributes: ["name"],
      }, {
        model: User,
        attributes: ["id", "nickname"],
      }]
    })
    
    return res.status(201).send(newPost);
  } catch(error) {
    console.error(error);
    next(error);
  };
});

// 포스트 수정 PATCH /api/post/3
router.patch("/:postId", async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { title, tags } = req.body;

    const post = await Post.findOne({
      where: { id: postId },
      include: {
        model: Tag
      }
    });
    await post.update({  // 제목 수정
      title,
    });
    await post.removeTags(post.tags.map((tag => tag)));  // 기존 태그 삭제

    const tagCheck = await Promise.all(tags.map(tag => Tag.findOrCreate({
      where: { name: tag },
    })));
    await post.addTags(tagCheck.map(tag => tag[0]));

    const patchedPost = await Post.findOne({
      where: { id: postId },
      attributes: ["id", "title", "imageUrl"],
      include: [{
        model: Tag,
        attributes: ["name"],
      }, {
        model: User,
        attributes: ["id", "nickname"],
      }]
    })
    return res.status(200).json(patchedPost);
  } catch(error) {
    console.error(error);
    next(error);
  };
});

// 포스트 삭제 DELETE /api/post/3
router.delete("/:postId", async (req, res, next) => {
  try {
    const { postId } = req.params;

    const deletingPost = await Post.destroy({
      where: { id: postId },
    })
    if(!deletingPost) {
      return res.status(403).send("삭제하려는 게시글이 존재하지 않습니다.");
    }

    return res.status(200).json({ result: "success" });
  } catch(error) {
    console.error(error);
    next(error);
  };
});

// 포스트 좋아요 누르기 GET /api/post/3/likes
router.get("/:postId/likes", async (req, res, next) => {
  try {

  } catch(error) {
    console.error(error);
    next(error);
  };
});

// 포스트 좋아요 취소 DELETE /api/post/3/likes
router.delete("/:postId/likes", async (req, res, next) => {
  try {

  } catch(error) {
    console.error(error);
    next(error);
  };
});

module.exports = router;