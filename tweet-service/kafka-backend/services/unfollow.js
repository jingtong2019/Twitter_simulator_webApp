var MongoClient = require('mongodb').MongoClient;
var config = require('../config/settings');
var mydb;

// Initialize connection once
MongoClient.connect(config.mongodb3, config.dbsetting, function(err, client) {
    //if(err) throw err;
    mydb = client.db(config.dbname3);
});

// MongoClient.connect(config.mongodb2, config.dbsetting, function(err, db) {
//     if(err) throw err;
//     mydb = db;
// });

function handle_request(msg, callback){
    console.log("In handle request:"+ JSON.stringify(msg));
    var response = {};

    if (!msg.hasOwnProperty('userid') || !msg.hasOwnProperty('userid_to_unfollow') 
            || !Number.isInteger(parseInt(msg.userid)) || !Number.isInteger(parseInt(msg.userid_to_unfollow))) {
        response.code = "202";
        response.value = "wrong req body";

        callback(null,response);
    }
    else {
        let following = mydb.collection('followings');
        let follower = mydb.collection('followers');
    
        following.update({userId: parseInt(msg.userid)}, { $pull: { follows: {userId: parseInt(msg.userid_to_unfollow)} }, $inc: { followingCount: -1 } }, 
                function(err,result){
            if (!err) {
                follower.update({userId: parseInt(msg.userid_to_unfollow)}, { $pull: { followers: {userId: parseInt(msg.userid)} }, $inc: { followersCount: -1 } }, 
                        function(err,result){
                    if (!err) {
                        //console.log("result -----------", result);
                        response.code = "200";
                        response.value = "Successfully unfollowed";
                
                        callback(null,response);
                    }
                });
            }
        });
    }
}

exports.handle_request = handle_request;




