const express = require('express');
const router = express.Router();
var kafka = require('../kafka/client');
var passport = require('passport');
var requireAuth = passport.authenticate('jwt', { session: false });

router.post('/newmessage', function (req, res) {
    
  console.log("in /newmessage",req.body);
    kafka.make_request('message_Topics',{"path":"saveMessage","body":req.body}, function(err,result){
     if (result.status === 200)
      { 
        res.status(200).json({ responseMessage: 'Successfully Sent!' });
      }
    });
  
  });

  router.post('/inbox/messages', function (req, res) {

    console.log("in /inbox/messages",req.body);
    kafka.make_request('message_Topics',{"path":"getMessages", "email": req.body.email}, function(err,result){
     if (result.status === 200)
      {
        res.status(200).json({ msgs: result.msgs });
      } else if (result.status === 401){
       res.status(200).json({ responseMessage: 'No results found!' });
      }
    });
  
  });

  module.exports = router;