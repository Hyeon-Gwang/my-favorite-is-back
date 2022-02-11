const express = require("express");

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
    
  } catch(error) {
    console.error(error);
    next(error);
  };
});

// 포스트 수정 PATCH /api/post/3
router.patch("/:postId", async (req, res, next) => {
  try {

  } catch(error) {
    console.error(error);
    next(error);
  };
});

// 포스트 삭제 DELETE /api/post/3
router.delete("/:postId", async (req, res, next) => {
  try {

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