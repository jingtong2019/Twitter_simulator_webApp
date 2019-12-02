const express = require('express');
const router = express.Router();
var config = require('../../config/settings');
var kafka = require('../kafka/client');
var jwt = require('jsonwebtoken');

router.post("/signup", (req, res) => {
  let username = req.body.name;
  username = username.split(' ').join('');

  let signupdata = {
    "name": username,
    "email": req.body.email.toLowerCase().trim(),
    "password": req.body.password,
    "description": req.body.description,
    "userhandle": "@" + username,
    "created_at": new Date(),
    "dateofbirth": req.body.dateofbirth,
    "firstname":req.body.firstname,
    "lastname":req.body.lastname,
    "city": req.body.city,
    "state":req.body.state,
    "zipcode": req.body.zipcode,
    "profilename": req.body.firstname+""+req.body.lastname
  }
  kafka.make_request('signupLogin_Topics', { "path": "createNewUser", "body": signupdata }, function (err, result) {
    if (result) {
      console.log("result is ",JSON.stringify(result));
      let data={
        signupSuccess: result.signupSuccess
      }
      res.status(200).json({ data });
    }
  })
});
router.post("/delete", (req,res)=>{
  let body = {
      username: req.body.username,
      password: req.body.password
  }
  kafka.make_request('signupLogin_Topics', {"path":"deleteuser", "body":body}, function(err,result){
      if (err){
          res.send({
              deleteSuccess:false
          })
      }else{
          console.log(result)
          res.send(result)
      }
  });
});

router.post('/login', function (req, res) {

  let username = req.body.username;
  username = username.split(' ').join('');
  let password = req.body.password;

  let logindata = {
    "username": username,
    "password": password
  }
  kafka.make_request('signupLogin_Topics', { "path": "login", "body": logindata }, function (err, result) {
   
    if (result) {
      var token = jwt.sign({ id: result.result[0].userid, username: result.result[0].username }, config.secret_key, {
        expiresIn: 7200
      });
      let cookies = { token: token, cookie1: result.result[0].userid, cookie2: result.result[0].username, cookie3: result.result[0].userhandle };

      let data={
        cookies:cookies,
        result:result
      }
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify(data));

    }
    else {
      res.status(202).json({ responseMessage: 'Cannot Login!' });
    }

  })

});

module.exports = router;
