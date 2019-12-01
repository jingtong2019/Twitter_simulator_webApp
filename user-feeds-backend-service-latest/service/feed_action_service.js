const tweetApi = require('../api/tweetApi');
const fakeApi = require('../api/fakeApi');
const appConfig = require('../config/main');
const Like = require('../models/like');
const Tweet = require('../models/tweet');
const TweetTest = require('../models/tweet_test');
const Comment = require('../models/comment');
const mongoose = require('mongoose');

module.exports = {
    blockFollowing: function(userId, followingUserId, callback) {
        const qry = {
            by: { $eq: 136 }
        }
        Tweet.find(qry)
            .exec()
            .then(doc => {
                callback(null, doc);
            })
            .catch(err => {
                console.log(err, null);
            })
    },
    muteFollowing: function(userId, muteUserId, callback) {
        fakeApi.getRandomNames(100)
            .then(resp => {
                for (var i = 1; i < resp.data.length; i++) {
                    var likeData = Array.from({length: (Math.random() * 10) + 1}, () => Math.floor(Math.random() * 100));
                    let tweet = new TweetTest({
                        by: i,
                        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                        images: ['https://picsum.photos/id/' + i + '/500/250'],
                        UserName: resp.data[i],
                        UserHandle: '@' + resp.data[i].split('_')[1],
                        hashtags:['#sample1', '#sample2'],
                        likes: likeData,
                        num_likes: likeData.length,
                        retweets: Math.floor((Math.random() * 100) + 1),
                        num_comments: Math.floor((Math.random() * 100) + 1),
                        views: Math.floor((Math.random() * 100) + 1),
                        tweet_type: 'ORIGINAL',
                        retweet_from: null,
                        date: Date.now()
                    });
                    tweet.save(function(err, doc) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(doc);
                        }
                    })
                }
            })
            .catch(err => {
                console.log(err);
            });
    },
    likeTweet: function(userId, tweetId, callback) {
        userId = parseInt(userId);
        const qry = {
            _id: { $eq: tweetId }
		} 
		Tweet.findOneAndUpdate(qry, { $push: { likes: userId  }, $inc: {num_likes: 1} }, {new: true}, function (err, doc) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, doc);
            }
        });
    },
    unlikeTweet: function(userId, tweetId, callback) {
        userId = parseInt(userId);
        const qry = {
            _id: { $eq: tweetId }
		} 
		Tweet.findOneAndUpdate(qry, { $pull: { likes: userId  }, $inc: {num_likes: -1} }, {new: true}, function (err, doc) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, doc);
            }
        });
    },
    reTweet: function(userId, tweetId, callback) {
        userId = parseInt(userId);
        const qry = {
            _id: { $eq: tweetId }
        }
        Tweet.findOneAndUpdate(qry, { $inc: {retweets: 1} }, {new: true}, function(err, doc) {
            if (err) {
                callback(err, null);
            } else {
                var updatedDoc = JSON.parse(JSON.stringify(doc));
                doc._id = mongoose.Types.ObjectId();
                doc.by = userId;
                doc.tweet_type = "RETWEET"
                doc.isNew = true;
                doc.save(function(err, saved) {
                    if (err) {
                        callback(err, null);
                    } else {
                        callback(null, updatedDoc);
                    }
                });
            }
        });
    },
    replyToTweet: function(userId, tweetId, content, userImage, callback) {
        var comment = new Comment({
            userId: parseInt(userId),
            userImage: userImage,
            tweetId: tweetId,
            content: content,
            likeCount: 0,
            likes: []
        });
        comment.save(function(err,doc) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, doc);
            }
        });
    },
};