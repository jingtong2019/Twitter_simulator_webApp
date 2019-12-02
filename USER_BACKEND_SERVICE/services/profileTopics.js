const { redisClient } = require('../redisClient');
const dBConnection = require('./ConnectionPooling');
//const dBConnection = require('./WithoutConnectionPooling.js');

exports.profileService = function profileService(msg, callback) {
    switch (msg.path) {
        case "getProfileDetails":
            getProfileDetails(msg, callback);
            break;
        case "updateprofile":
            updateprofile(msg, callback);
            break;
        case "updateprofileImage":
            updateprofileImage(msg, callback);
            break;
        case "getAllUsersDetails":
                getAllUsersDetails(msg,callback);
                break;
    }
};

async function getProfileDetails(msg, callback) {
    let con = await dBConnection();
    let result = {};
    let redisKey = "applicantProfile_" + msg.body.userid;
    redisClient.get(redisKey, async function (err, profile) {
        if (!err && profile != null) {
            console.log("Data found in cache");
            profile = JSON.parse(profile);
            result = profile;
            callback(null, { status: 200, result });
        }
        else {
            console.log("Data not found in cache");
            con.query('SELECT * from user WHERE userid=? ', [msg.body.userid], async function (err, profile) {
                if (profile) {
                    con.query("COMMIT", (err, commit) => {
                        if (commit) {
                            console.log("Setting data in cache");
                            redisClient.set(redisKey, JSON.stringify(profile[0]), function (error, reply) {
                                if (error) {
                                    console.log(error);
                                }
                            });
                            result = profile[0];
                            console.log("profile data is ", result);
                            redisClient.expire(redisKey, 3000000);
                            callback(null, { status: 200, result });
                        }
                    })
                }
            })

        }

    })
}
async function getAllUsersDetails( msg,callback) {
    let con = await dBConnection();
     con.query('SELECT * from user', async function (err, result) {
                if (result) {
                    con.query("COMMIT", (err, commit) => {
                        if (commit) {
                            callback(null, { status: 200, result });
                        }
                    })
                }
            })

        }

async function getProfileDetailsvthoutcaching(msg, callback) {
    let con = await dBConnection();
    console.log("msg is  " + msg.body.userid);
    const signUpQuery = "SELECT * from user WHERE userid=?"

    con.query(signUpQuery, [msg.body.userid], function (err, profile) {
        if (profile) {
            con.query("COMMIT", (err, commit) => {
                if (commit) {
                    callback(null, { status: 200, profile });
                }
            })
        }
    })

}
async function updateprofile(msg, callback) {
   let con = await dBConnection();
   const updateQuery = "UPDATE user SET username=?,userhandle=?,website_url=?, description=?,profileimage_url = ?,dateofbirth=?,city=?,state=?,zipcode=? WHERE userid = ?"

    con.query(updateQuery, [msg.body.username,msg.body.userhandle, msg.body.website_url,msg.body.description, msg.body.profileimage_url,msg.body.dateofbirth, msg.body.city,msg.body.state,msg.body.zipcode,msg.body.userid], async function (err, profile) {
        if (profile) {
            con.query("COMMIT", (err, commit) => {
                if (commit) {
                   
                    const signUpQuery = "SELECT * from user WHERE userid=?"

                    con.query(signUpQuery, [msg.body.userid], function (err, profiledetails) {
                        if (profiledetails) {
                           redisClient.del("applicantProfile_" + msg.body.userid);
                          callback(null, { status: 200, profiledetails });
                              
                        }
                    })
                   
                }
            })
        }
    })
}


async function updateprofileImage(msg, callback) {
    let con = await dBConnection();
    
    const updateQuery = "UPDATE user SET username=?,userhandle=?,website_url=?, description=?,dateofbirth=?,city=?,state=?,zipcode=? WHERE userid = ?"
   
    
    con.query(updateQuery, [msg.body.username,msg.body.userhandle, msg.body.website_url,msg.body.description,msg.body.dateofbirth, msg.body.city,msg.body.state,msg.body.zipcode,msg.body.userid]
        , async function (err, profile) {
        if (profile) {
            con.query("COMMIT", (err, commit) => {
                if (commit) {
                   
                    const signUpQuery = "SELECT * from user WHERE userid=?"

                    con.query(signUpQuery, [msg.body.userid], function (err, profiledetails) {
                        if (profiledetails) {
                         redisClient.del("applicantProfile_" + msg.body.userid);
                          callback(null, { status: 200, profiledetails });
                              
                        }
                    })
                   
                }
            })
        }
    })
}