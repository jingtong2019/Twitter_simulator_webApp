var kafka = require('../../kafka/client');
var TOPICS = require('../../kafka/topics');

module.exports = function (router) {

    router.get('/feeds/:userId/:pageNumber', function (req, res) {
        kafka.make_request(TOPICS.TWITTER_FEED_REQUEST_TOPIC, 'get-user-feeds', req.params, req.body, function(err,doc){
            if (err){
                res.status(500).json({
                    message: 'Error getting twitter feeds for this user',
                    error: err
                })
            }else{
                res.status(200).json(doc);
                }
        });
    })

    router.get('/userFollowers/:userId', function (req, res) {
        kafka.make_request(TOPICS.FOLLOWER_REQUEST_TOPIC, 'get-user-followers', req.params, req.body, function(err,doc){
            if (err){
                res.status(500).json({
                    message: 'Error getting followers for this user',
                    error: err
                })
            } else {
                    res.status(200).json(doc);
                }
        });
    });

    router.get('/userFollowing/:userId', function (req, res) {
        kafka.make_request(TOPICS.FOLLOWER_REQUEST_TOPIC, 'get-user-following', req.params, req.body, function(err,doc){
            if (err){
                res.status(500).json({
                    message: 'Error getting users followed by this user',
                    error: err
                })
            }else{
                res.status(200).json(doc);
                }
        });
    })

    router.get('/profileViews/:userId/:duration', function (req, res) {
        kafka.make_request(TOPICS.PROFILE_VIEWS_REQUEST_TOPIC, 'get-profile-views', req.params, req.body, function(err,doc){
            if (err){
                res.status(500).json({
                    message: 'Error getting profile views for this user',
                    error: err
                })
            }else{
                res.status(200).json(doc);
                }
        });
    })

    router.post('/updateUserFollowers/:userId/:followerId', function (req, res) {
        kafka.make_request(TOPICS.FOLLOWER_REQUEST_TOPIC, 'update-user-followers', req.params, req.body, function(err,doc){
            if (err){
                res.status(500).json({
                    message: 'Error updating followers for this user',
                    error: err
                })
            }else{
                res.status(200).json(doc);
            }
        });
    });

    router.post('/blockFollowing/:userId/:followingUserId', function (req, res) {
        kafka.make_request(TOPICS.FEED_ACTION_REQUEST_TOPIC, 'block-user-following', req.params, req.body, function(err,doc){
            if (err){
                res.status(500).json({
                    message: 'Error blocking this followers for current user',
                    error: err
                })
            }else{
                res.status(200).json(doc);
            }
        });
    });

    router.post('/muteFollowing/:userId/:muteUserId', function (req, res) {
        kafka.make_request(TOPICS.FEED_ACTION_REQUEST_TOPIC, 'mute-user-following', req.params, req.body, function(err,doc){
            if (err){
                res.status(500).json({
                    message: 'Error muting this followers for current user',
                    error: err
                })
            }else{
                res.status(200).json(doc);
            }
        });
    });

    router.post('/likeTweet/:userId/:tweetId', function (req, res) {
        kafka.make_request(TOPICS.FEED_ACTION_REQUEST_TOPIC, 'like-tweet', req.params, req.body, function(err,doc){
            if (err){
                res.status(500).json({
                    message: 'Error upadting like for current user',
                    error: err
                })
            }else{
                res.status(200).json(doc);
            }
        });
    });

    router.post('/unlikeTweet/:userId/:tweetId', function (req, res) {
        kafka.make_request(TOPICS.FEED_ACTION_REQUEST_TOPIC, 'unlike-tweet', req.params, req.body, function(err,doc){
            if (err){
                res.status(500).json({
                    message: 'Error upadting unlike for current user',
                    error: err
                })
            }else{
                res.status(200).json(doc);
            }
        });
    });

    router.post('/reTweet/:userId/:tweetId', function (req, res) {
        kafka.make_request(TOPICS.FEED_ACTION_REQUEST_TOPIC, 're-tweet', req.params, req.body, function(err,doc){
            if (err){
                res.status(500).json({
                    message: 'Error reTweeting the tweet for current user',
                    error: err
                })
            }else{
                res.status(200).json(doc);
            }
        });
    });

    router.post('/replyToTweet/:userId/:tweetId', function (req, res) {
        kafka.make_request(TOPICS.FEED_ACTION_REQUEST_TOPIC, 'replyto-Tweet', req.params, req.body, function(err,doc){
            if (err){
                res.status(500).json({
                    message: 'Error reTweeting the tweet for current user',
                    error: err
                })
            }else{
                res.status(200).json(doc);
            }
        });
    });
};