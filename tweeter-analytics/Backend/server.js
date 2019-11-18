const express = require("express");
const app = express();
const morgan = require("morgan"); // logger
const appConfig = require("./config/main");
const kafkaConfig = require("./kafka/config");
var kafka = require("kafka-node");

app.set("port", process.env.PORT || 3002);

app.use(express.static("static"));

app.use(morgan("dev"));

app.use(function(req, res) {
  const err = new Error("Not Found");
  err.status = 404;
  res.json(err);
});

//  MongoDB connection
const mongoose = require("mongoose");
mongoose.connect(appConfig.database, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Connected to MongoDB");
  app.listen(app.get("port"), function() {
    console.log("API Server Listening on port " + app.get("port") + "!");
  });
});
