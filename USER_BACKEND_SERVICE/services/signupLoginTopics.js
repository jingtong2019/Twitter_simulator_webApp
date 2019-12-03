const dBConnection = require('./ConnectionPooling');
const Follower = require("../models/follower");
const Following = require("../models/following");
const bookmark = require("../models/bookmark");
var crypt = require('../models/bcrypt.js');


exports.signupLoginService = function signupLoginService(msg, callback) {
    switch (msg.path) {
        case "createNewUser":
            createNewUser(msg, callback);
            break;
        case "login":
            login(msg, callback);
            break;
        case "deleteuser":
            deleteuser(msg, callback);
            break;
    }
};
async function login(msg, callback) {
  

    let con = await dBConnection();
    con.query('SELECT * from user WHERE username = ?', [msg.body.username], function (err1, result) {
        if (result[0] && !err1) {
            crypt.compareHash(msg.body.password, result[0].password, function (err, isMatch) {
                if (isMatch && !err) {
                    console.log("login successful,passwords matched" + result[0]);
                    console.log("creating token");
                    callback(null, { result })
                }
                else {
                    console.log("passwords did not match");
                    callback({ status: 202 });
                }
            })
        }
        if (err1) {
            console.log("Incorrect Credentials");
            callback({ status: 202 });
        }
    });
}
async function deleteuser(msg, callback) {

    let con = await dBConnection();
    con.query('SELECT * from user WHERE username = ?', [msg.body.username], function (err1, result) {
        if (result[0] && !err1) {
            crypt.compareHash(msg.body.password, result[0].password, function (err, isMatch) {
                if (isMatch && !err) {
                    con.query('DELETE FROM user WHERE username=?', [msg.body.username], (err, res) => {
                        if (!err) {
                            con.query("COMMIT", (err, result1) => {
                                if (result1) {
                                    callback(null, { deleteSuccess: true })
                                }
                            })
                        } else {
                            callback(null, { deleteSuccess: false })
                        }
                    })

                }
                else {
                    callback(null, { deleteSuccess: false })
                }
            })
        }
    })
}
async function createNewUser(msg, callback) {
    let con = await dBConnection();
    con.query('SELECT * from user WHERE username=?', [msg.body.name], function (err1, result) {
        if (result[0] && !err1) {
            callback(null, {
                signupSuccess: false,
                signupMessage: "User Already Exists"
            })
        }
        else {
            crypt.createHash(msg.body.password, async function (encryptedpassword) {
                let password = encryptedpassword;
                console.log("In signup" + password);


                console.log("In signup" + JSON.stringify(msg.body));
                con.query('INSERT INTO user(username, email, password, description, userhandle,created_at,dateofbirth,firstname,lastname,city,state,zipcode,profilename) VALUES(?,?,?,?,?,CURDATE(),?,?,?,?,?,?,?)', [msg.body.name, msg.body.email, password, msg.body.description, msg.body.userhandle, msg.body.dateofbirth, msg.body.firstname, msg.body.lastname, msg.body.city, msg.body.state, msg.body.zipcode, msg.body.profilename], async (err, result) => {
                    if (result) {
                        console.log("after inserting the result is " + result);
                        con.query("COMMIT", (err, result1) => {
                            if (result1) {
                                con.query('SELECT userid FROM user WHERE username=?', [msg.body.name], async (err, userid) => {
                                    if (userid) {
                                        console.log("the result user id is " + userid[0].userid);

                                        var Bookmark = new bookmark({
                                            userId: userid[0].userid,
                                            tweetId: []
                                        });
                                        Bookmark.save(function (err, bookmark1) {
                                            if (bookmark1) {
                                                console.log("bookmarks are ", bookmark1);
                                          var follower = new Follower({
                                                    userId: userid[0].userid,
                                                    followers: [],
                                                    followersCount: 0
                                                });
                                                follower.save(function (err, docs) {
                                                    if (docs) {
                                                        console.log("Response from follower collection is ", docs);
                                                        var following = new Following({
                                                            userId: userid[0].userid,
                                                            follows: [],
                                                            followingCount: 0
                                                        });
                                                        following.save(function (err, docs1) {
                                                            if (docs1) {
                                                                console.log("Response from following collection is ", docs1);
                                                                callback(null, {
                                                                    signupSuccess: true,
                                                                    signupMessage: "Sign Up Success. Sign In to continue!"
                                                                })
                                                            }
                                                        })
                                                    }
                                                })
                                            }
                                        })
                                    }
                                })
                            }
                        })

                    }

                })
            })
        }
    })
}

