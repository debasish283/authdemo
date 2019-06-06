let app = require("../../index");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../../src/app");
let should = chai.should();

const mongoose = require("mongoose");
const user_model = mongoose.model("user_model");

chai.use(chaiHttp);

chai.use(chaiHttp);

// user_model.remove({}, (err, data) => {})

let user = new user_model({
  name: "DebasishM",
  password: "password",
  admin: true
});
user.save((err, data) => {});

describe("/POST to get authentication", () => {
  it("it should POST users", done => {
    let user = {
      name: "Debasish",
      password: "password"
    };
    chai
      .request(server)
      .post("/setup")
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
});

describe("/POST should not post users as name is missing", () => {
  it("it should not POST users", done => {
    let user = {
      password: "password"
    };
    chai
      .request(server)
      .post("/setup")
      .send(user)
      .end((err, res) => {
        res.should.have.status(500);
        res.body.should.be.a("object");
        done();
      });
  });
});

describe("/POST should not post users as password is missing", () => {
  it("it should not POST users", done => {
    let user = {
      name: "Debasish"
    };
    chai
      .request(server)
      .post("/setup")
      .send(user)
      .end((err, res) => {
        res.should.have.status(500);
        res.body.should.be.a("object");
        done();
      });
  });
});

describe("/DELETE a user", () => {
  it("it should DELETE a user", done => {
    chai
      .request(server)
      .delete("/removeUser/Debasish")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
});
