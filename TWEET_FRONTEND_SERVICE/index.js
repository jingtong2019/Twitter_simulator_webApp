//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

var getUserTweet = require('./routes/getUserTweet');
var tweet = require('./routes/tweet');
var follow = require('./routes/follow');
var unfollow = require('./routes/unfollow');
var getIsFollowed = require('./routes/getIsFollowed');
var bookmark = require('./routes/bookmark');
var unbookmark = require('./routes/unbookmark');
var getIsBookmarked = require('./routes/getIsBookmarked');
var getBookmarks = require('./routes/getBookmarks');
var getAllTweetOfUser = require('./routes/getAllTweetOfUser');
var deleteTweet = require('./routes/deleteTweet');
var deleteAllTweet = require('./routes/deleteAllTweet');
var updateViews = require('./routes/updateViews');
var insertBookmark = require('./routes/insertBookmark');
var getAllUserTweets = require('./routes/getAllUserTweets');
var getTweetsByHashtags = require('./routes/getTweetsByHashtags');

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(bodyParser.json());

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });


app.use("/getUserTweet", getUserTweet);
app.use("/tweet", tweet);
app.use("/follow", follow);
app.use("/unfollow", unfollow);
app.use("/getIsFollowed", getIsFollowed);
app.use("/bookmark", bookmark);
app.use("/unbookmark", unbookmark);
app.use("/getIsBookmarked", getIsBookmarked);
app.use("/getBookmarks", getBookmarks);
app.use("/getAllTweetOfUser", getAllTweetOfUser);
app.use("/deleteTweet", deleteTweet);
app.use("/deleteAllTweet", deleteAllTweet);
app.use("/updateViews", updateViews);
app.use("/insertBookmark", insertBookmark);
app.use("/getAllUserTweets", getAllUserTweets);
app.use("/getTweetsByHashtags", getTweetsByHashtags);

//start your server on port 3001
//app.listen(3001);
module.exports = app.listen(3001);
console.log("Server Listening on port 3001");