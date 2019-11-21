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
// app.use(function(req, res) {
//   const err = new Error("Not Found");
//   err.status = 404;
//   res.json(err);
// });
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

// MongoDB connection
// const mongoose = require("mongoose");
// mongoose
//   .connect(appConfig.tweetDB, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(result => {
//     console.log("connected to mongo");
//   })
//   .catch(err => {
//     console.log(err);
//   });
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", function() {
//   console.log("Connected to MongoDB");
//   app.listen(app.get("port"), function() {
//     console.log("API Server Listening on port " + app.get("port") + "!");
//   });
// });

app.listen(app.get("port"), function() {
  console.log("API Server Listening on port " + app.get("port") + "!");
});

var router = express.Router();

// test route
router.get("/", function(req, res) {
  res.json({ message: "welcome to our upload module apis" });
});
router.get("/getUserTweets", tweetsService.getTopLikeTweet);
// router.get("/getUserTweets", tweetsService.getTopViewTweet);
// router.get("/getUserTweets", tweetsService.getTopRetweetTweet);

app.use("/api", router);
