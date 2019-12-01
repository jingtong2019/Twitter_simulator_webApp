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


    following.find({userId: msg.userid, follows: { $elemMatch: { userId: msg.userid_is_follow} } }).toArray(function(err,result){
        if (!err) {
            response.code = "200";
            response.value = "Successfully checked";
            response.isFollowed = (result.length !== 0);
            callback(null,response);
        }
    });
    
        
            
    

}

exports.handle_request = handle_request;




