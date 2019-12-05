var assert = require('chai').assert;
var app = require('../index');

var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;

var agent = require('chai').request.agent(app);

describe('backend', function(){

    it('POST /getAllTweetOfUser',function(){
        let req = {
            userid: 1000,
        }
        agent.post('/getAllTweetOfUser')
            .send(req)
            .then(function(res){
                expect(res.status).to.equal(200);
            });
    });

    it('POST /getIsBookmarked',function(){
        let req = {
            userid: 567,
            tweetid: "5de5b1c25b52dc6f7e06eba7"
        }
        agent.post('/getIsBookmarked')
            .send(req)
            .then(function(res){
                expect(res.status).to.equal(200);
            });
        
    });

    it('POST /follow',function(){
        let req = {
            userid: 20,
            userid_to_follow: 40
        }
        agent.post('/follow')
            .send(req)
            .then(function(res){
                expect(res.status).to.equal(200);
            });
        
    });
    it('POST /unfollow',function(){
        let req = {
            userid: 20,
            userid_to_unfollow: 40
        }
        agent.post('/unfollow')
            .send(req)
            .then(function(res){
                expect(res.status).to.equal(200);
            });
        
    });

    it('POST /getIsFollowed',function(){
        let req = {
            userid: 10,
            userid_is_follow: 30
        }
        agent.post('/getIsFollowed')
            .send(req)
            .then(function(res){
                expect(res.status).to.equal(200);
            });
        
    });
})

