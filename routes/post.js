const express = require("express");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Post, Tag, User } = require("../models");
const authMiddleware = require("../middlewares/auth-middleware");

const router = express.Router();

try {
  fs.accessSync('images');
} catch(error) {
  console.log('images 폴더가 없습니다. 새로 생성합니다.');
  fs.mkdirSync('images');
};

// 포스트 작성 POST /api/post/new
router.post("/new", authMiddleware, async (req, res, next) => {
  try {
    const { title, imageUrl, tags } = req.body;
    const { id } = res.locals.user;
    
    const post = await Post.create({
      title,
      imageUrl,
      userId: id,  // test용으로 1번 유저 삽입
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
        attributes: ["id", "name"],
        through: { attributes: [] },
      }, {
        model: User,
        attributes: ["id", "nickname"],
      }]
    })
    
    return res.status(201).json(newPost);
  } catch(error) {
    console.error(error);
    next(error);
  };
});

// 포스트 수정 PATCH /api/post/3
router.patch("/:postId", authMiddleware, async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { title, tags } = req.body;
    const { id } = res.locals.user;

    const post = await Post.findOne({
      where: { id: postId },
      include: {
        model: Tag
      },
    });

    const userCheck = id === post.userId
    if(!userCheck) {
      return res.status(403).send("포스트를 수정할 권한이 없습니다.");
    };

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
        attributes: ["id", "name"],
        through: { attributes: [] },
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
router.delete("/:postId", authMiddleware, async (req, res, next) => {
  try {
    const { postId } = req.params;

    const deletingPost = await Post.destroy({
      where: { id: postId },
    });

    if(!deletingPost) {
      return res.status(403).send("존재하지 않는 포스트입니다.");
    };

    return res.status(200).json({ result: "success" });
  } catch(error) {
    console.error(error);
    next(error);
  };
});

// 포스트 좋아요 누르기 GET /api/post/3/likes
router.get("/:postId/likes", authMiddleware, async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { id } = res.locals.user;

    const post = await Post.findOne({
      where: { id: postId },
    });

    if(!post) {
      return res.status(400).send("존재하지 않는 포스트입니다.");
    };

    await post.addLikers(id);

    return res.status(201).json({ result: "success" });
  } catch(error) {
    console.error(error);
    next(error);
  };
});

// 포스트 좋아요 취소 DELETE /api/post/3/likes
router.delete("/:postId/likes", authMiddleware, async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { id } = res.locals.user;

    const post = await Post.findOne({
      where: { id: postId },
    });
    if(!post) {
      return res.status(403).send("존재하지 않는 포스트입니다.");
    };

    await post.removeLikers(id);

    return res.status(200).json({ result: "success" });
  } catch(error) {
    console.error(error);
    next(error);
  };
});

// multer 셋팅
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "images");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname) // 확장자 추출(.png)
      const basename = path.basename(file.originalname, ext) // 파일 이름 추출(이름)
      done(null, basename + "_" + new Date().getTime() + ext) // 이름_1518123131.png
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});

// 이미지 업로드 POST /api/post/image
router.post("/image", upload.single("image"), (req, res, next) => {
  res.json(req.file.filename);
});

module.exports = router;