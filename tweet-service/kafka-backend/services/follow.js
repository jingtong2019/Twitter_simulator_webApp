var MongoClient = require('mongodb').MongoClient;
var config = require('../config/settings');
var mydb;

// // Initialize connection once
// MongoClient.connect(config.mongodb, config.dbsetting, function(err, client) {
//   //if(err) throw err;
//   mydb = client.db(config.dbname);
// });

MongoClient.connect(config.mongodb2, config.dbsetting, function(err, db) {
    if(err) throw err;
    mydb = db;
});

function handle_request(msg, callback){
    console.log("In handle request:"+ JSON.stringify(msg));
    var response = {};
    let following = mydb.collection('following');
    let follower = mydb.collection('follower');

    following.update({userId: msg.userid},
            {$push: { follows: {userId: msg.userid_to_follow, followedDate: new Date()} }, $inc: { "followingCount": 1 } }, function(err,result){
        if (!err) {
            follower.update({userId: msg.userid_to_follow}, 
                { $push: { followers: {userId: msg.userid, followedDate: new Date()} }, $inc: { followersCount: 1 }  }, 
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

exports.handle_request = handle_request;




