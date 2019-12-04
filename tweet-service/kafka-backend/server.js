'use strict';
// Include our packages in our main server file
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');
var app = express();


// Use body-parser to get POST requests for API use
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

// Log requests to console
app.use(morgan('dev'));

var connection =  new require('./kafka/Connection');

//topics files

var GetUserTweet = require('./services/getUserTweet.js');
var Tweet = require('./services/tweet.js');
var Follow = require('./services/follow.js');
var Unfollow = require('./services/unfollow.js');
var GetIsFollowed = require('./services/getIsFollowed.js');
var Bookmark = require('./services/bookmark.js');
var Unbookmark = require('./services/unbookmark.js');
var GetIsBookmarked = require('./services/getIsBookmarked.js');
var GetBookmarks = require('./services/getBookmarks.js');
var GetAllTweetOfUser = require('./services/getAllTweetOfUser.js');
var DeleteTweet = require('./services/deleteTweet.js');
var DeleteAllTweet = require('./services/deleteAllTweet.js');
var UpdateViews = require('./services/updateViews.js');
var InsertBookmark = require('./services/insertBookmark.js');
var GetAllUserTweets = require('./services/getAllUserTweets.js');
var GetTweetsByHashtags = require('./services/getTweetsByHashtags.js');

function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request

handleTopicRequest("getUserTweet",GetUserTweet)
handleTopicRequest("tweet",Tweet)
handleTopicRequest("follow",Follow)
handleTopicRequest("unfollow",Unfollow)
handleTopicRequest("getIsFollowed",GetIsFollowed)
handleTopicRequest("bookmark",Bookmark)
handleTopicRequest("unbookmark",Unbookmark)
handleTopicRequest("getIsBookmarked",GetIsBookmarked)
handleTopicRequest("getBookmarks",GetBookmarks)
handleTopicRequest("getAllTweetOfUser",GetAllTweetOfUser)
handleTopicRequest("deleteTweet",DeleteTweet)
handleTopicRequest("deleteAllTweet",DeleteAllTweet)
handleTopicRequest("updateViews",UpdateViews)
handleTopicRequest("insertBookmark",InsertBookmark)
handleTopicRequest("getAllUserTweets",GetAllUserTweets)
handleTopicRequest("getTweetsByHashtags",GetTweetsByHashtags)