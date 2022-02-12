const express = require("express");
const models = require('../models')
const jwt = require('jsonwebtoken')
const authMiddleware = require('../middlewares/auth-middleware')
const router = express.Router();

// 회원가입 POST API /api/user/new
router.post("/new", async (req, res) => {
  try {
    const { userID, nickname, password, createdAt, updatedAt } = req.body;
    await models.User.create({
      userID: userID,
      nickname: nickname,
      password: password,
      createdAt: createdAt,
      updatedAt: updatedAt,
    })
    res.status(200).json({
      msg: '회원가입 성공'
    });
  } catch (error) {
    res.status(400).json({
      errorMessage: '입력정보를 다시 확인해주세요.'
    })
  };
});

// 로그인 POST API /api/user/login
router.post('/login', async (req, res) => {
  try {
    const { userID, password } = req.body
    const user = await models.User.findAll({
      where: {
        userID: userID,
        password: password,
      }
    })
    // 유저 정보가 없으면 예외처리
    if (!user.length) {
      throw error
    }
    // jwt 토큰 발급
    const token = jwt.sign({ userId: user[0].dataValues.userID }, 'my-secret-key')
    res.send({
      token,
      msg: '로그인 완료!'
    })

  } catch (error) {
    res.status(400).json({
      errorMessage: '회원정보를 다시 확인해주세요.'
    })
  }
})

// 사용자 인증
router.get('/me', authMiddleware, (req, res) => {
  const {user} = res.locals
  res.send({
      user
  })
})

module.exports = router;