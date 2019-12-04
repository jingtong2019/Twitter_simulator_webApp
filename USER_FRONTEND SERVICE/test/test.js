let chai = require('chai');
let should = require('chai').should();
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
let expect = chai.expect;
let assert = require('assert');


describe('Twitter testing using Mocha and Chai', () => {

    it("Test case 1- Signup", (done) => {
        let Userdata = {
            name: "nithya",
            email: "testnithya4341@gmail.com",
            password: "testnithya41341",
            zipcode:94086,
        }
       chai.request('http://ec2-18-223-2-86.us-east-2.compute.amazonaws.com:5000')
            .post('/signup')
            .send(Userdata)
            .end(function (err, res) {
                expect(err).to.be.null;
                res.status.should.be.equal(200);
                res.body.data.should.have.property('signupSuccess').equal(true);
                done();
            });
    })

    it("Test case 2-Login", (done) => {
        let logindata = {
            username: "testnithya1041",
            password: "testnithya41341"
        }
       chai.request('http://ec2-18-223-2-86.us-east-2.compute.amazonaws.com:5000')
            .post('/login')
            .send(logindata)
            .end(function (err, res) {
                expect(err).to.be.null;
                res.body.should.be.a('object');
                expect(res.body.result.result[0].username).to.equal("testnithya123");
                done();
            });
    })
    it("Test case 3- Get Profile details",(done)=>
    {
        let data = {
           "userid":9786
        }
       chai.request('http://ec2-18-223-2-86.us-east-2.compute.amazonaws.com:5000')
        .post('/getProfileDetails')
        .send(data)
        .end(function (err, res) {
            expect(err).to.be.null;
            res.status.should.be.equal(200);
            res.body.should.be.a('object');
            expect(res.body.result.username).to.equal("testnithya41");
        done();
        });
    })
    it("Test case 4- Update Profile Name",(done)=>
     {
    let data = {
        Bio: "Test",
        userID: 9786
    }
   chai.request('http://ec2-18-223-2-86.us-east-2.compute.amazonaws.com:5000')
    .post('/updateprofile')
    .send(data)
    .end(function (err, res) {
        expect(err).to.be.null;
       res.status.should.be.equal(200);
        res.body.should.be.a('object');
        expect(res.body.profiledetails[0].description).to.equal("Test");
        done();
    });
})
it("Test case 5- Delete User",(done)=>
{
let data = {
   username: "testnithya1041",
   password: "testnithya41341"
}
chai.request('http://ec2-18-223-2-86.us-east-2.compute.amazonaws.com:5000')
.post('/delete')
.send(data)
.end(function (err, res) {
   expect(err).to.be.null;
   res.status.should.be.equal(200);
    expect(res.body.deleteSuccess).to.equal(true);
   done();
});
})
})

