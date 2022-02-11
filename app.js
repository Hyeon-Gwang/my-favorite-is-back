// 주석추가
// 주석추가!!!
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

const userRouter = require("./routes/user");
const postRouter = require("./routes/post");
const postsRouter = require("./routes/posts");

const db = require("./models");
db.sequelize.sync()
  .then(() => {
    console.log("DB 연결 성공...");
  })
  .catch(console.error);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: "*",
  // credentials: true,
}))

// connections test
app.get("/", (req, res) => {
  res.send("hello from my-favorite-is");
});

// routers
app.use("/api/user", userRouter);
app.use("/api/posts", postsRouter);
app.use("/api/post", postRouter);

app.listen(80, () => {
  console.log("나의최애는 server is running on port=80");
});