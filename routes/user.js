const express = require("express");

const router = express.Router();

// GET /api/user/new
router.get("/new", async (req, res, next) => {
  try {
    const { userID, nickname, password } = req.body;

    const result = {
      test: "success",
      userID,
      nickname,
      password,
    }
    res.status(200).json(result);
  } catch(error) {
    console.error(error);
    next(error);
  };
});

module.exports = router;