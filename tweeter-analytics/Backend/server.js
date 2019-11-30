const express = require("express");
const app = express();
const morgan = require("morgan"); // logger
const appConfig = require("./config/main");
const kafkaConfig = require("./kafka/config");
var kafka = require("kafka-node");
var tweetsService = require("./service/feeds-service");
var bodyParser = require("body-parser");
app.set("port", process.env.PORT || 3002);
app.use(express.static("static"));
app.use(morgan("dev"));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(app.get("port"), function() {
  console.log("API Server Listening on port " + app.get("port") + "!");
});

var router = express.Router();
