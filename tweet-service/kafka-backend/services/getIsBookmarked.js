var ObjectID = require('mongodb').ObjectID;
var MongoClient = require('mongodb').MongoClient;
var config = require('../config/settings');
var mydb;

if (config.redisSetting === 'on') {
    var {redisClient} = require('../redisClient');
}

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

    if (!msg.hasOwnProperty('userid') || !msg.hasOwnProperty('tweetid') || !Number.isInteger(parseInt(msg.userid))) {
        response.code = "202";
        response.value = "wrong req body";

        callback(null,response);
    }
    else {
        if (config.redisSetting === 'on') {
            let redisKey = "getIsBookmarked" + msg.userid + "plus" + msg.tweetid;
            redisClient.get(redisKey, async function (err, result) {
                if (!err && result != null) {
                    console.log("---------Data found in cache");
                    response.code = "200";
                    response.value = "Successfully checked";
                    response.isBookmarked = result;
                    callback(null,response);
                }
                else {
                    let bookmark = mydb.collection('bookmark');
                    bookmark.find({userId: parseInt(msg.userid), tweetId: { $elemMatch: { $eq: ObjectID(msg.tweetid)} } }).toArray(function(err,result){
                        if (!err) {
                            response.code = "200";
                            response.value = "Successfully checked";
                            response.isBookmarked = (result.length !== 0);

                            redisClient.set(redisKey, JSON.stringify(response.isBookmarked), function (error, reply) {
                                if (error) {
                                    console.log(error);
                                }
                            });

                            redisClient.expire(redisKey, 3000000);
                            callback(null,response);
                        }
                    });
                }
            });
        }
        else {
            let bookmark = mydb.collection('bookmark');

            bookmark.find({userId: parseInt(msg.userid), tweetId: { $elemMatch: { $eq: ObjectID(msg.tweetid)} } }).toArray(function(err,result){
                if (!err) {
                    response.code = "200";
                    response.value = "Successfully checked";
                    response.isBookmarked = (result.length !== 0);
                    callback(null,response);
                }
            });
        }
        
    }

}

exports.handle_request = handle_request;




