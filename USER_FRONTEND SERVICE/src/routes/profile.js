const express = require('express');
const router = express.Router();
var kafka = require('../kafka/client');


router.post('/download-file/', (req, res) => {
  var file = req.body.image.imageUrl;
  if (file !== "") {
    res.writeHead(200, {
      'Content--type': 'text/plain'
    });
    res.end(file);

  }
});

router.post("/getProfileDetails", (req, res) => {
  console.log("IN GET PROFILE DETAILS BACKEND");
  let data = {
    "userid": req.body.userid
  }
  kafka.make_request('profile_Topics', { "path": "getProfileDetails", "body": data }, function (err, result) {
    if (result) {
       res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify(result));
    }
  })
});
router.get("/getAllUsersDetails", (req, res) => {
  console.log("IN getAllUsersDetails");
  kafka.make_request('profile_Topics', { "path": "getAllUsersDetails","body":{}}, function (err, result) {
    if (result) {
       res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify(result));
    }
  })
});

router.post("/updateprofile", (req, res) => {
  let data = {};
  if (req.body.ProfileImage) {
    data = {
      "userid": req.body.userID,
      "username": req.body.username,
      "description": req.body.Bio,
       "website_url": req.body.Website,
      "dateofbirth": req.body.dateofbirth,
      "userhandle": req.body.userhandle,
      "profileimage_url": req.body.ProfileImage,
      "city":req.body.city,
      "state": req.body.state,
      "zipcode":req.body.zipcode
    }
    console.log("RESULT BEFORE UPDATE IS ", req.body.userID);
    kafka.make_request('profile_Topics', { "path": "updateprofile", "body": data }, function (err, result) {
      if (result) {
        console.log("RESULT UPDATE IS " + JSON.stringify(result));
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify(result));
      }
    })
  }
  else {
    console.log("date of birth is ", req.body.BirthDate);
    data = {
      "userid": req.body.userID,
      "username": req.body.username,
      "description": req.body.Bio,
      "userhandle": req.body.userhandle,
      "website_url": req.body.Website,
      "dateofbirth": req.body.dateofbirth,
      "city":req.body.city,
      "state": req.body.state,
      "zipcode":req.body.zipcode
    }
    kafka.make_request('profile_Topics', { "path": "updateprofileImage", "body": data }, function (err, result) {
      if (result) {
        console.log("RESULT UPDATE IS " + JSON.stringify(result));
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(JSON.stringify(result));
      }
    })

  }

});

router.post("/updateprofileImage", (req, res) => {
  console.log("IN UPDATE PROFILE IMAGE");
  let data = {
    "userid": req.body.userID,
    "profileimage_url": req.body.ProfileImage
  }
  console.log("RESULT BEFORE UPDATE IS ", req.body.userID);
  kafka.make_request('profile_Topics', { "path": "updateprofileImage", "body": data }, function (err, result) {
    if (result) {
      console.log("RESULT UPDATE IS " + JSON.stringify(result));
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify(result));
    }
  })
});
module.exports = router;