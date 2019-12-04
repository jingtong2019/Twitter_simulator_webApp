var MongoClient = require('mongodb').MongoClient;
var config = require('../config/settings');
var mydb;

// Initialize connection once
MongoClient.connect(config.mongodb3, config.dbsetting, function(err, client) {
  //if(err) throw err;
  mydb = client.db(config.dbname3);
});

// MongoClient.connect(config.mongodb3, function(err, db) {
//     if(err) throw err;
//     mydb = db;
//     console.log("database=============", mydb);
// });

function handle_request(msg, callback){
    console.log("In handle request:"+ JSON.stringify(msg));
    var response = {};

    if (!msg.hasOwnProperty('userid') || !msg.hasOwnProperty('userid_to_follow') 
            || !Number.isInteger(parseInt(msg.userid)) || !Number.isInteger(parseInt(msg.userid_to_follow))) {
        response.code = "202";
        response.value = "wrong req body";

        callback(null,response);
    }
    else {
        let following = mydb.collection('followings');
        let follower = mydb.collection('followers');
    
    
        following.update({userId: parseInt(msg.userid)},
                {$push: { follows: {userId: parseInt(msg.userid_to_follow), followedDate: new Date()} }, $inc: { "followingCount": 1 } }, function(err,result){
            if (!err) {
                follower.update({userId: parseInt(msg.userid_to_follow)}, 
                    { $push: { followers: {userId: parseInt(msg.userid), followedDate: new Date()} }, $inc: { followersCount: 1 }  }, 
                        function(err,result){
                    if (!err) {
                        //console.log("result -----------", result);
                        response.code = "200";
                        response.value = "Successfully followed";
                
                        callback(null,response);
                    }
                });
            }
        });
    }


}

exports.handle_request = handle_request;




