let app = require("../../index");
let server = require("../../src/app");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let should = chai.should();

let user = {
  name: "DebasishM",
  password: "password",
  admin: true
};

chai
  .request(server)
  .post("/authenticate")
  .send(user)
  .end((err, res) => {
    let TOKEN = res.body.token;
    console.log(TOKEN);
    describe("/POST a filter", () => {
      it("it should POST a filter", done => {
        let filter = {
          filterName: "filter3",
          filterParameters:
            'if [path] =~ "access" {\n    mutate { replace => { "type" => "apache_access" } }\n    grok {\n      match => { "message" => "%{COMBINEDAPACHELOG}" }\n    }\n  }\n  date {\n    match => [ "timestamp" , "dd/MMM/yyyy:HH:mm:ss Z" ]\n  }'
        };
        chai
          .request(server)
          .post("/logstash/filters")
          .send(filter)
          .set("x-access-token", TOKEN)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            done();
          });
      });
    });

    describe("/POST a filter", () => {
      it("it should not POST a filter since it is duplicated", done => {
        let filter = {
          filterName: "filter3",
          filterParameters:
            'if [path] =~ "access" {\n    mutate { replace => { "type" => "apache_access" } }\n    grok {\n      match => { "message" => "%{COMBINEDAPACHELOG}" }\n    }\n  }\n  date {\n    match => [ "timestamp" , "dd/MMM/yyyy:HH:mm:ss Z" ]\n  }'
        };
        chai
          .request(server)
          .post("/logstash/filters")
          .send(filter)
          .set("x-access-token", TOKEN)
          .end((err, res) => {
            res.should.have.status(500);
            res.body.should.be.a("object");
            done();
          });
      });
    });

    describe("/POST a filter", () => {
      it("it should not POST a filter since no filter name is available", done => {
        let filter = {
          filterParameters:
            'if [path] =~ "access" {\n    mutate { replace => { "type" => "apache_access" } }\n    grok {\n      match => { "message" => "%{COMBINEDAPACHELOG}" }\n    }\n  }\n  date {\n    match => [ "timestamp" , "dd/MMM/yyyy:HH:mm:ss Z" ]\n  }'
        };
        chai
          .request(server)
          .post("/logstash/filters")
          .send(filter)
          .set("x-access-token", TOKEN)
          .end((err, res) => {
            res.should.have.status(500);
            res.body.should.be.a("object");
            done();
          });
      });
    });

    describe("/POST a filter", () => {
      it("it should not POST a filter since no filter parameters is available", done => {
        let filter = {
          filterName: "filter4"
        };
        chai
          .request(server)
          .post("/logstash/filters")
          .send(filter)
          .set("x-access-token", TOKEN)
          .end((err, res) => {
            res.should.have.status(500);
            res.body.should.be.a("object");
            done();
          });
      });
    });

    describe("/GET logstash filters", () => {
      it("it should GET all the filters", done => {
        chai
          .request(server)
          .get("/logstash/filters")
          .set("x-access-token", TOKEN)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("array");
            done();
          });
      });
    });

    describe("/GET logstash filters by filters name", () => {
      it("logstash filters by filters name", done => {
        chai
          .request(server)
          .get("/logstash/filters/filter3")
          .set("x-access-token", TOKEN)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });

    describe("/GET logstash filters by filters name", () => {
      it("Should return a 404 since filter is not available", done => {
        chai
          .request(server)
          .get("/logstash/filters/notpresent")
          .set("x-access-token", TOKEN)
          .end((err, res) => {
            res.should.have.status(404);
            done();
          });
      });
    });

    describe("/PUT Edit a filter", () => {
      it("it should UPDATE name", done => {
        let filter = {
          filterName: "filter4"
        };
        chai
          .request(server)
          .put("/logstash/filters/filter3")
          .set("x-access-token", TOKEN)
          .send(filter)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            done();
          });
      });
    });

    describe("/PUT Edit a filter", () => {
      it("it should UPDATE filter params", done => {
        let filter = {
          filterParameters:
            'if [path] =~ "accesss" {\n    mutate { replace => { "type" => "apache_access" } }\n    grok {\n      match => { "message" => "%{COMBINEDAPACHELOG}" }\n    }\n  }\n  date {\n    match => [ "timestamp" , "dd/MMM/yyyy:HH:mm:ss Z" ]\n  }'
        };
        chai
          .request(server)
          .put("/logstash/filters/filter4")
          .set("x-access-token", TOKEN)
          .send(filter)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            done();
          });
      });
    });

    describe("/DELETE a filter", () => {
      it("it should DELETE a filter", done => {
        chai
          .request(server)
          .delete("/logstash/filters/filter4")
          .set("x-access-token", TOKEN)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            done();
          });
      });
    });

    describe("/DELETE a filter", () => {
      it("it should not DELETE a filter since data is not available", done => {
        chai
          .request(server)
          .delete("/logstash/filters/filter4")
          .set("x-access-token", TOKEN)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a("object");
            done();
          });
      });
    });
  });
