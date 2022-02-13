const request = require("supertest");

const app = require("../app");

describe("POST /api/post/new 테스트", () => {
  test("title, imageUrl, tags를 전달 받아야 한다.", (done) => {
    
  });

  test("tag의 갯수는 1개 이상 5개 이하여야 한다.", () => {
    // front에서 갯수 검사할지 back에서 할지 생각
  });

  test("작성한 포스트를 반환해주어야 한다.", () => {

  });
});

describe("PATCH /api/post/${postId} 테스트", () => {
  test("title, tags를 전달 받아야 한다.", (done) => {
    
  });

  test("post 작성자와 요청자의 id가 같아야 한다.", () => {
    // front에서 갯수 검사할지 back에서 할지 생각
  });

  test("수정된 포스트를 반환해주어야 한다.", () => {

  });
});

describe("DELETE /api/post/${postId} 테스트", () => {

});