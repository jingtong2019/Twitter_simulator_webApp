var kafka = require('../kafka/client');
const express = require("express");
const router = express.Router();
var path = require('path');
var multer = require('multer');
var fs = require("fs");
// var storage = multer.diskStorage({
//     destination: '../uploads/',
//     filename: function(req, file, cb){
//       cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });

const aws = require('aws-sdk');
const multerS3 = require('multer-s3');

aws.config.update({
  secretAccessKey: "qzAhZtCO5bWJ1j4Pr7oKNyJd3XSkecYFP8vJpx2P",
  accessKeyId: "AKIAIGQ7ZUOMXDFKD7MQ",
  region: 'us-west-1'
});

const s3 = new aws.S3();

var storage = multerS3({
    s3,
    bucket: 'tweetimages',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: 'TESTING_META_DATA!'});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + path.extname(file.originalname));
    }
  })
  
const upload = multer({ storage });

router.post('/', upload.array('myImage', 10), (req, res) => {
    
    req.body.images = [];
    //console.log("content-------------", req.body.content);
    let content_test = req.body.content;
    for (let i=0; i<req.files.length; i++) {
        //console.log("location-------------", req.files[i].location);
        req.body.images.push(req.files[i].location);
    }
    //console.log("req.body", req.body.content);
    req.body.hashtags = [];
    req.body.hyperlinks = [];
    let words = req.body.content.replace(/\n/g, " ");
    let hlist = words.split(" ");
    //console.log("list-------------", hlist);
    for (let i=0; i< hlist.length; i++) {
        //console.log("list-------------", hlist[i]);
        let s = hlist[i];
        if (s.length > 1 && s.includes("#") && !s.substring(1, s.length).includes("#")) {
            req.body.hashtags.push(s);
        }
        if (s.length > 7 && s.startsWith('https://')) {
            req.body.hyperlinks.push(s);
            content_test = content_test.replace(s, "<a href=\"" + s + "\">" + s + "</a>");
        }
    }
    //console.log("content_test-------------", content_test);
    req.body.content = content_test;
    kafka.make_request('tweet',req.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("Inside else");
            // for (let i=0; i<req.files.length; i++) {
            //     fs.unlinkSync(req.files[i].path);
            // }
            console.log("number", req.body.images.length);
            res.status(results.code).send(results);
        }
        
    });
});


module.exports = router;


// var kafka = require('../kafka/client');
// const express = require("express");
// const router = express.Router();

// router.post('/', function(req, res){
//     console.log("test", req.body);
//     kafka.make_request('tweet',req.body, function(err,results){
//         console.log('in result');
//         console.log(results);
//         if (err){
//             console.log("Inside err");
//             res.json({
//                 status:"error",
//                 msg:"System Error, Try Again."
//             })
//         }else{
//             console.log("Inside else");
//             res.status(results.code).send(results);
//         }
        
//     });
// });


// module.exports = router;