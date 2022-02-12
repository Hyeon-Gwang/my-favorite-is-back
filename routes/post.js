const express = require("express");

const router = express.Router();

// GET /api/post
router.get("/", async (req, res, next) => {
  try {
    res.status(200).send("sended from '/api/post'");
  } catch (error) {
    console.error(error);
    next(error);
  };
});

router.post('/new', async (req, res) => {
  try {
    const { data } = req.body
    console.log(data)
    const { authorization } = req.headers
    const auth = authorization.split(' ')[1]
    const userId = jwt.decode(auth).userId
    // console.log(userId, '============', data)
    res.json({
      userId
    })
    // const nick = await User.findById(userId)
    // const nickname = nick.nickname
    // const date = new Date().toISOString()
  } catch (error) {

  }
})

module.exports = router;