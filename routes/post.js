const express = require("express");

const router = express.Router();

// GET /api/post
router.get("/", async (req, res, next) => {
  try {
    res.status(200).send("sended from '/api/post'");
  } catch(error) {
    console.error(error);
    next(error);
  };
});

module.exports = router;