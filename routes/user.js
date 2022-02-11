const express = require("express");

const router = express.Router();

// POST /api/user/new
router.post("/new", async (req, res, next) => {
  try {
    const { userID, nickname, password } = req.body;

    const test = {
      test: "success",
      userID,
      nickname,
      password,
    }
    res.status(200).json(test);
  } catch(error) {
    console.error(error);
    next(error);
  };
});

module.exports = router;