let app = require("../../index");
let server = require("../../src/app");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let should = chai.should();

chai.use(chaiHttp);

let user = {
  name: "DebasishM",
  password: "password"
};
chai
  .request(server)
  .post("/authenticate")
  .send(user)
  .end((err, res) => {
    let TOKEN = res.body.token;
    console.log(TOKEN);

    describe("/POST an Input", () => {
      it("it should POST a input", done => {
        let input = {
          inputName: "http",
          inputType: "http",
          requiredParameters: {
            port: "80"
          }
        };
        chai
          .request(server)
          .post("/logstash/inputs")
          .send(input)
          .set("x-access-token", TOKEN)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            done();
          });
      });
    });

    describe("/POST Should not post input since it is duplicated - Status 500", () => {
      it("it should not POST a input since it is duplicated", done => {
        let input = {
          inputName: "http",
          inputType: "http",
          requiredParameters: {
            port: "80"
          }
        };
        chai
          .request(server)
          .post("/logstash/inputs")
          .set("x-access-token", TOKEN)
          .send(input)
          .end((err, res) => {
            res.should.have.status(500);
            res.body.should.be.a("object");
            done();
          });
      });
    });

    describe("/POST Input without requiredParameters - should send status 500", () => {
      it("it should not POST a input without requiredParameters", done => {
        let input = {
          inputName: "Test",
          inputType: "beats"
        };
        chai
          .request(server)
          .post("/logstash/inputs")
          .send(input)
          .set("x-access-token", TOKEN)
          .end((err, res) => {
            res.should.have.status(500);
            res.body.should.be.a("object");
            done();
          });
      });
    });

    describe("/POST Input without inputName - should send status 500", () => {
      it("it should not POST a input without inputName", done => {
        let input = {
          inputType: "beats",
          requiredParameters: {
            port: "5044"
          }
        };
        chai
          .request(server)
          .post("/logstash/inputs")
          .set("x-access-token", TOKEN)
          .send(input)
          .end((err, res) => {
            res.should.have.status(500);
            res.body.should.be.a("object");
            done();
          });
      });
    });

    describe("/POST an input without inputType - should send status 500", () => {
      it("it should not POST a input without type", done => {
        let input = {
          inputName: "http",
          requiredParameters: {
            port: "80"
          }
        };
        chai
          .request(server)
          .post("/logstash/inputs")
          .set("x-access-token", TOKEN)
          .send(input)
          .end((err, res) => {
            res.should.have.status(500);
            res.body.should.be.a("object");
            done();
          });
      });
    });

    describe("/GET logstash inputs", () => {
      it("it should GET all the inputs", done => {
        chai
          .request(server)
          .get("/logstash/inputs")
          .set("x-access-token", TOKEN)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("array");
            done();
          });
      });
    });

    describe("/GET logstash inputs by input name", () => {
      it("logstash inputs by input name", done => {
        chai
          .request(server)
          .get("/logstash/inputs/http")
          .set("x-access-token", TOKEN)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });

    describe("/GET logstash inputs by input name", () => {
      it("Should return a 404 if input is not available", done => {
        chai
          .request(server)
          .get("/logstash/inputs/notpresent")
          .set("x-access-token", TOKEN)
          .end((err, res) => {
            res.should.have.status(404);
            done();
          });
      });
    });

    describe("/PUT Edit an input", () => {
      it("it should UPDATE an input type", done => {
        let input = {
          inputType: "https"
        };
        chai
          .request(server)
          .put("/logstash/inputs/http")
          .set("x-access-token", TOKEN)
          .send(input)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            done();
          });
      });
    });

    describe("/PUT Edit an input", () => {
      it("it should UPDATE an input name", done => {
        let input = {
          inputName: "https"
        };
        chai
          .request(server)
          .put("/logstash/inputs/http")
          .set("x-access-token", TOKEN)
          .send(input)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            done();
          });
      });
    });

    describe("/PUT Edit an input", () => {
      it("it should UPDATE an input name, iput type and required Parameters", done => {
        let input = {
          inputName: "http",
          inputType: "http",
          requiredParameters: {
            port: 80
          }
        };
        chai
          .request(server)
          .put("/logstash/inputs/https")
          .set("x-access-token", TOKEN)
          .send(input)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            done();
          });
      });
    });

    describe("/DELETE an Input", () => {
      it("it should DELETE an input", done => {
        chai
          .request(server)
          .delete("/logstash/inputs/http")
          .set("x-access-token", TOKEN)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            done();
          });
      });
    });

    describe("/DELETE - Input is not available it should return a 404", () => {
      it("it should DELETE an input", done => {
        chai
          .request(server)
          .delete("/logstash/inputs/http")
          .set("x-access-token", TOKEN)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a("object");
            done();
          });
      });
    });
  });
