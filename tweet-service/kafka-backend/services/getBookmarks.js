var ObjectID = require('mongodb').ObjectID;
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
    let bookmark = mydb.collection('bookmark');
    let tweet = mydb.collection('tweet');


    bookmark.find({userId: msg.userid }, {_id: 0, tweetId: 1}).toArray(function(err,result){
        if (!err) {
            //console.log("result========", result[0].tweetId);
            tweet.find({_id: {$in: result[0].tweetId} }).toArray(function(err,res){
                if (!err) {
                    response.code = "200";
                    response.value = "Successfully get bookmarks";
                    response.result = res;
                    callback(null,response);
                }
            });
            
        }
    });
    
        
            
    

}

exports.handle_request = handle_request;




