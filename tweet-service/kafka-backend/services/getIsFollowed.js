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

    if (!msg.hasOwnProperty('userid') || !msg.hasOwnProperty('userid_is_follow') 
            || !Number.isInteger(parseInt(msg.userid)) || !Number.isInteger(parseInt(msg.userid_is_follow))) {
        response.code = "202";
        response.value = "wrong req body";

        callback(null,response);
    }
    else {
        let following = mydb.collection('followings');

        following.find({userId: parseInt(msg.userid), follows: { $elemMatch: { userId: parseInt(msg.userid_is_follow)} } }).toArray(function(err,result){
            if (!err) {
                response.code = "200";
                response.value = "Successfully checked";
                response.isFollowed = (result.length !== 0);
                callback(null,response);
            }
        });
    }

}

exports.handle_request = handle_request;




