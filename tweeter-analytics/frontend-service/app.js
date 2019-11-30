const express = require("express");
const app = express();
const api = require("./api");
const morgan = require("morgan"); // logger
const bodyParser = require("body-parser");
const cors = require("cors");

app.set("port", process.env.PORT || 4010);

app.use(bodyParser()); //{ limit: "10mb" })
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.disable("etag");

// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cors());
app.use("/api", api);
// app.use(express.static("static"));
// i added
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(morgan("dev"));

app.use(function(req, res) {
  const err = new Error("Not Found");
  err.status = 404;
  res.json(err);
});

app.listen(app.get("port"), function() {
  console.log("API Server Listening on port " + app.get("port") + "!");
});

module.exports = app;
