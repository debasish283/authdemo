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
    describe("/POST an output", () => {
      it("it should POST a output", done => {
        let output = {
          outputName: "http",
          outputType: "http",
          requiredParameters: {
            port: "80"
          }
        };
        chai
          .request(server)
          .post("/logstash/outputs")
          .send(output)
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
        let output = {
          outputName: "http",
          outputType: "http",
          requiredParameters: {
            port: "80"
          }
        };
        chai
          .request(server)
          .post("/logstash/outputs")
          .set("x-access-token", TOKEN)
          .send(output)
          .end((err, res) => {
            res.should.have.status(500);
            res.body.should.be.a("object");
            done();
          });
      });
    });

    describe("/POST Output without requiredParameters - should send status 500", () => {
      it("it should not POST output without requiredParameters", done => {
        let output = {
          outputName: "Test",
          outputType: "http"
        };
        chai
          .request(server)
          .post("/logstash/outputs")
          .send(output)
          .set("x-access-token", TOKEN)
          .end((err, res) => {
            res.should.have.status(500);
            res.body.should.be.a("object");
            done();
          });
      });
    });

    describe("/POST Output without outputName - should send status 500", () => {
      it("it should not POST a input without outputName", done => {
        let output = {
          outputType: "beats",
          requiredParameters: {
            port: "5044"
          }
        };
        chai
          .request(server)
          .post("/logstash/inputs")
          .set("x-access-token", TOKEN)
          .send(output)
          .end((err, res) => {
            res.should.have.status(500);
            res.body.should.be.a("object");
            done();
          });
      });
    });

    describe("/POST an output without outputType - should send status 500", () => {
      it("it should not POST a output without type", done => {
        let output = {
          outputName: "http",
          requiredParameters: {
            port: "80"
          }
        };
        chai
          .request(server)
          .post("/logstash/inputs")
          .set("x-access-token", TOKEN)
          .send(output)
          .end((err, res) => {
            res.should.have.status(500);
            res.body.should.be.a("object");
            done();
          });
      });
    });

    describe("/GET logstash outputs", () => {
      it("it should GET all the outputs", done => {
        chai
          .request(server)
          .get("/logstash/outputs")
          .set("x-access-token", TOKEN)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("array");
            done();
          });
      });
    });

    describe("/GET logstash outputs by output name", () => {
      it("logstash inputs by output name", done => {
        chai
          .request(server)
          .get("/logstash/outputs/http")
          .set("x-access-token", TOKEN)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });

    describe("/GET logstash output by output name", () => {
      it("Should return a 404 since output is not available", done => {
        chai
          .request(server)
          .get("/logstash/outputs/notpresent")
          .set("x-access-token", TOKEN)
          .end((err, res) => {
            res.should.have.status(404);
            done();
          });
      });
    });

    describe("/PUT Edit an output", () => {
      it("it should UPDATE an output type", done => {
        let output = {
          outputType: "https"
        };
        chai
          .request(server)
          .put("/logstash/outputs/http")
          .set("x-access-token", TOKEN)
          .send(output)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            done();
          });
      });
    });

    describe("/PUT Edit an output", () => {
      it("it should UPDATE an output name", done => {
        let output = {
          outputName: "https"
        };
        chai
          .request(server)
          .put("/logstash/outputs/http")
          .set("x-access-token", TOKEN)
          .send(output)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            done();
          });
      });
    });

    describe("/PUT Edit an input", () => {
      it("it should UPDATE an input name, iput type and required Parameters", done => {
        let output = {
          outputName: "http",
          outputType: "beats",
          requiredParameters: {
            port: 5045
          }
        };
        chai
          .request(server)
          .put("/logstash/outputs/https")
          .set("x-access-token", TOKEN)
          .send(output)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            done();
          });
      });
    });

    describe("/DELETE an output", () => {
      it("it should DELETE an output", done => {
        chai
          .request(server)
          .delete("/logstash/outputs/http")
          .set("x-access-token", TOKEN)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            done();
          });
      });
    });

    describe("/DELETE - Output is not available it should return a 404", () => {
      it("it should not DELETE an output", done => {
        chai
          .request(server)
          .delete("/logstash/outputs/http")
          .set("x-access-token", TOKEN)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a("object");
            done();
          });
      });
    });
  });
