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
    //console.log("In handle request:"+ JSON.stringify(msg));
    var response = {};
    let tweet = mydb.collection('tweet');
    let query = {
        content: msg.content,
        images: msg.images,
        by: parseInt(msg.userid),
        hashtags: msg.hashtags,
        likes: [],
        num_likes: 0,
        retweets: 0,
        num_comments: 0,
        views: 0,
        tweet_type: "ORIGINAL",
        retweet_from: "null",
        date: new Date()
    };
    tweet.insert(query, {w:1}, function(err, result) {
        if (!err) {
            response.code = "200";
            response.value = "Successfully tweet";
    
            callback(null,response);
        }
    });
    
        
            
    

}

exports.handle_request = handle_request;




