var kafka = require('../../kafka/client');

module.exports = function (router) {
    router.get('/feeds/:userId/:start', function (req, res) {
        kafka.make_request('twitter-feed-request-topic', 'get-user-feeds', req.params, req.body, function(err,doc){
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
};