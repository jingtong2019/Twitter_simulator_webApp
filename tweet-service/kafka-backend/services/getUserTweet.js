var MongoClient = require('mongodb').MongoClient;
var config = require('../config/settings');
// const  {redisClient} = require('../redisClient');
if (config.redisSetting === 'on') {
    var {redisClient} = require('../redisClient');
}
var Request = require("request");
var userFollowingURL = "http://ec2-35-161-86-90.us-west-2.compute.amazonaws.com:4010/api/userFollowing/";
var mydb;

// // Initialize connection once
// MongoClient.connect(config.mongodb, config.dbsetting, function(err, client) {
//   //if(err) throw err;
//   mydb = client.db(config.dbname);
// });

MongoClient.connect(config.mongodb1, config.dbsetting, function(err, db) {
    if(err) throw err;
    mydb = db;
});

function handle_request(msg, callback){
    console.log("In handle request:"+ JSON.stringify(msg));
    console.log("redis is ", config.redisSetting);
    var response = {};

    if (!msg.hasOwnProperty('userid') || !Number.isInteger(parseInt(msg.userid))) {
        response.code = "202";
        response.value = "wrong req body";

        callback(null,response);
    }
    else {
        let tweet = mydb.collection('tweet');
    
        Request.get(userFollowingURL + msg.userid, (error, res, body) => {
            if(!error) {
                response.code = "200";
                response.value = "Successfully find messages";
                
                body = JSON.parse(body);
                if (!body.hasOwnProperty('follows')) {
                    response.result = [];
                    callback(null,response);
                }
                else {
                    let following = [parseInt(msg.userid)];
                    //console.log("test2-----------", JSON.parse(body), typeof(JSON.parse(body)));
                    for (let i=0;i<body.follows.length;i++){
                        following.push(body.follows[i].userId);
                    }
                    // console.log(following);
                    // console.log(typeof(following[0]));
    
                    tweet.find({by: {$in: following}, tweet_type: { $ne: "COMMENT" }}).sort({"date": -1}).toArray(function(err,result){
                        if (!err) {
                            //console.log("result -----------", result);
                            response.code = "200";
                            response.value = "Successfully find messages";
                    
                            response.result = result;
                            callback(null,response);
                        }
                    });
                            
                }
                
                
            }
            
        });
    
        
    }

    

}



// function handle_request(msg, callback){
//     console.log("In handle request:"+ JSON.stringify(msg));
//     console.log("redis is ", config.redisSetting);
//     var response = {};
//     let tweet = mydb.collection('tweet');
//     if (config.redisSetting === 'on') {
//         let redisKey = "getUserTweet" + msg.userid;
//         redisClient.get(redisKey, async function (err, result) {
//             if (!err && result != null) {
//                 console.log("---------Data found in cache");
//                 response.code = "200";
//                 response.value = "Successfully find messages";
//                 response.result = result;
//                 callback(null,response);
//             }
//             else {
//                 Request.get(userFollowingURL + msg.userid, (error, res, body) => {
//                     if(!error) {
//                         response.code = "200";
//                         response.value = "Successfully find messages";
//                         //console.dir(JSON.parse(body));
                        
//                         body = JSON.parse(body);
//                         if (body.followingCount == 0) {
//                             response.result = [];
//                             callback(null,response);
//                         }
//                         else {
//                             let following = [];
//                             //console.log("test2-----------", JSON.parse(body), typeof(JSON.parse(body)));
//                             for (let i=0;i<body.follows.length;i++){
//                                 following.push(body.follows[i].userId);
//                             }
//                             // console.log(following);
//                             // console.log(typeof(following[0]));
            
//                             tweet.find({by: {$in: following}, tweet_type: { $ne: "COMMENT" }}).sort({"date": -1}).toArray(function(err,result){
//                                 if (!err) {
//                                     redisClient.set(redisKey, JSON.stringify(result), function (error, reply) {
//                                         if (error) {
//                                             console.log(error);
//                                         }
//                                     });
                                
//                                     response.result = result;
//                                     redisClient.expire(redisKey, 3000000);
//                                     callback(null,response);
//                                 }
//                             });
                                    
//                         }
                        
                        
//                     }
                    
//                 });
//             }
//         });
//     }
//     else {
//         Request.get(userFollowingURL + msg.userid, (error, res, body) => {
//             if(!error) {
//                 response.code = "200";
//                 response.value = "Successfully find messages";
                
//                 body = JSON.parse(body);
//                 if (body.followingCount == 0) {
//                     response.result = [];
//                     callback(null,response);
//                 }
//                 else {
//                     let following = [];
//                     //console.log("test2-----------", JSON.parse(body), typeof(JSON.parse(body)));
//                     for (let i=0;i<body.follows.length;i++){
//                         following.push(body.follows[i].userId);
//                     }
//                     // console.log(following);
//                     // console.log(typeof(following[0]));
    
//                     tweet.find({by: {$in: following}, tweet_type: { $ne: "COMMENT" }}).sort({"date": -1}).toArray(function(err,result){
//                         if (!err) {
//                             //console.log("result -----------", result);
//                             response.code = "200";
//                             response.value = "Successfully find messages";
                    
//                             response.result = result;
//                             callback(null,response);
//                         }
//                     });
                            
//                 }
                
                
//             }
            
//         });

//     }
    

// }

exports.handle_request = handle_request;








