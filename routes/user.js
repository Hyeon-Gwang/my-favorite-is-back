const express = require("express");
const { User } = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const authMiddleware = require('../middlewares/auth-middleware')
const router = express.Router();

// 회원가입 POST API /api/user/new
router.post("/new", async (req, res) => {
  try {
    const { userID, nickname, password } = req.body;
    // password 암호화
    const encryptedPassword = bcrypt.hashSync(password, 10)

    await User.create({
      userID: userID,
      nickname: nickname,
      password: encryptedPassword,
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

// 아이디 중복 체크하기  api/user/check
router.post('/check', async (req, res) => {
  try {
    const { userID } = req.body
    const user = await User.findAll({
      where: {
        userID: userID,
      }
    })
    if (!user.length) {
      res.json({
        msg: '가입가능'
      })
    } else {
      throw new Error('error')
    }
  } catch (error) {
    res.json({
      errorMessage: '이미 있는 아이디입니다.'
    })
  }
})

// 로그인 POST API /api/user/login
router.post('/login', async (req, res, next) => {
  try {
    const { userID, password } = req.body

    const user = await User.findOne({
      where: {
        userID,
      }
    })

    if(!user) {
      return res.status(400).send("아이디가 존재하지 않습니다.");
    }

    // jwt 토큰 발급 여기부분 중요..
    const token = jwt.sign({ userID: user.userID }, 'my-secret-key')

    res.send({
      user,
      token,
      msg: '로그인 완료!'
    })

  } catch (error) {
    console.error(error);
    next(error);
  }
})

// 사용자 인증(로그인 상태를 확인해주는 기능)
router.get('/me', authMiddleware, (req, res) => {
  const { user } = res.locals
  res.send({
    user
  })
})

module.exports = router;