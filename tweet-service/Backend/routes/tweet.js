var kafka = require('../kafka/client');
const express = require("express");
const router = express.Router();
var path = require('path');
var multer = require('multer');
var fs = require("fs");
var storage = multer.diskStorage({
    destination: '../uploads/',
    filename: function(req, file, cb){
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
  
const upload = multer({ storage });

router.post('/', upload.array('myImage', 10), (req, res) => {
    
    req.body.images = [];
    for (let i=0; i<req.files.length; i++) {
        console.log("path-------------", req.files[i].path);
        let values = fs.readFileSync(req.files[i].path);
        let image = "data:image/jpeg;base64," + values.toString('base64');
        req.body.images.push(image);
    }
    //console.log("req.body", req.body.content);
    req.body.hashtags = [];
    let words = req.body.content.replace(/\n/g, " ");
    let hlist = words.split(" ");
    //console.log("list-------------", hlist);
    for (let i=0; i< hlist.length; i++) {
        //console.log("list-------------", hlist[i]);
        let s = hlist[i];
        if (s.length > 1 && s.includes("#") && !s.substring(1, s.length).includes("#")) {
            req.body.hashtags.push(s);
        }
    }
    //console.log("hashtags-------------", req.body.hashtags);
    
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
            for (let i=0; i<req.files.length; i++) {
                fs.unlinkSync(req.files[i].path);
            }
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