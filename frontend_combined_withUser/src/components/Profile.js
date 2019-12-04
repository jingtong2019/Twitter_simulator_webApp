import React, { Component } from 'react';
import { profileaction, updateProfile, getLoggedInUserTweets } from '../redux/actions/profile';
import {  viewList , clearcheck } from '../redux/actions/search-actions'
import { connect } from 'react-redux';
import './css/profile.css';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { imageDownload, imageUpload } from '../redux/actions/image_actions';
import { Redirect } from 'react-router';
import { isfollowing, follow, unfollow } from '../redux/actions/follow-actions';
import { Link } from 'react-router-dom';
import { followingCount, followerCount } from '../redux/actions/followerfollowing-actions';
import Search from "./Search";
import imgg from "../components/trends.png";

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            show: false,
            userdetails: {},
            profilename: "",
            userhandle: "",
            Bio: "",
            Website: "",
            dateofbirth: "",
            ProfileImage: "",
            ProfileImagePreview: "",
            created_at: "",
            Followers: 0,
            Following: 0,
            firstname: "",
            lastname: "",
            city: "",
            state: "",
            zipcode: "",
            username: "",
            IncorrectCredentials: "",
            followDisplay: false,
            userid: ""
        }

    }
    async componentDidMount() {

      this.props.getLoggedInUserTweets(parseInt(localStorage.getItem("cookie1")), (status, data) => {
        // check status and act
      });

        var path = this.props.location.pathname;

       

        console.log("THE PATH IS IN PROFILE", path);

        var id = path.replace("/profile/", "");
        console.log("id is ", id);

        this.setState(
            {
                userid: id
            }

        )
        if (id !== localStorage.getItem('cookie1')) {
            let data = {
                "userid": localStorage.getItem('cookie1'),
                "userid_is_follow": id

            }
            await this.props.isfollowing(data);
            console.log("IN PROFILE this.props.isfollowingvalue", this.props.isfollowingvalue);
            if (!this.props.isfollowingvalue) {
                this.setState(
                    {
                        followDisplay: true
                    }
                )
            }
        }
        console.log("user data is ", id);
        let post =
        {
            "userid": id
        }
        await this.props.profileaction(post);
        if (this.props.profiledetails) {

            await this.props.followingCount(id);
            await this.props.followerCount(id);

            if (this.props.follower_no) {
                this.setState(
                    {
                        Followers: this.props.follower_no
                    }
                )
            }

            if (this.props.following_no) {
                this.setState(
                    {
                        Following: this.props.following_no
                    }
                )
            }

            let date = this.props.profiledetails.dateofbirth;
            if (date) {
                date = date.substring(0, 10);
            }
            let joineddate = this.props.profiledetails.created_at;
            if (joineddate) {
                joineddate = joineddate.substring(0, 10);
            }
            this.setState({
                userdetails: this.props.profiledetails,
                userhandle: this.props.profiledetails.userhandle,
                profilename: this.props.profiledetails.profilename,
                Bio: this.props.profiledetails.description,
                Website: this.props.profiledetails.website_url,
                dateofbirth: date,
                ProfileImage: this.props.profiledetails.profileimage_url,
                created_at: joineddate,
                firstname: this.props.profiledetails.firstname,
                lastname: this.props.profiledetails.lastname,
                city: this.props.profiledetails.city,
                state: this.props.profiledetails.state,
                zipcode: this.props.profiledetails.zipcode,
                username: this.props.profiledetails.username

            });

            let imageUrl = {
                imageUrl: this.props.profiledetails.profileimage_url
            }
            if (this.props.profiledetails.profileimage_url !== null) {
                await this.props.imageDownload(imageUrl);
                this.setState({
                    ProfileImagePreview: this.props.imagePreviewresponse
                })
            }
        }

    }
    onValidate = (e) => {

        const validZipcode = RegExp("^[0-9]{5}(?:-[0-9]{4})?$");

        const validDate = RegExp("([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))");
        console.log("the zipcode is ", this.state.zipcode, validZipcode.test(this.state.zipcode));
        if (this.state.zipcode && !validZipcode.test(this.state.zipcode)) {
            this.setState(
                {
                    IncorrectCredentials: "Invalid Zipcode. Valid Zipcodes should be like 90086-1929 or 90086"
                }
            )
            return false;
        }

        return true;

    }
    updatesProfile = async (e) => {

        let isValid = this.onValidate();
        if (isValid) {
            var data = {};

            var path = this.props.location.pathname;



            var id = path.replace("/profile/", "");


            if (this.state.ProfileImage) {

                data = {
                    userID: id,
                    userhandle: "@" + this.state.username,
                    username: this.state.username,
                    Bio: this.state.Bio,

                    Website: this.state.Website,
                    dateofbirth: this.state.dateofbirth,
                    ProfileImage: this.state.ProfileImage.imageUrl,
                    city: this.state.city,
                    state: this.state.state,
                    zipcode: this.state.zipcode

                }
            }
            else {

                data = {
                    userID: id,
                    userhandle: "@" + this.state.username,
                    username: this.state.username,
                    Bio: this.state.Bio,

                    Website: this.state.Website,
                    dateofbirth: this.state.dateofbirth,
                    city: this.state.city,
                    state: this.state.state,
                    zipcode: this.state.zipcode

                }
            }
            this.setState(
                {
                    show: false
                }
            )
            await this.props.updateProfile(data);
            if (this.props.profiledetails) {
                this.setState({
                    userdetails: this.props.profiledetails,


                });
            }
        }

    }
    handleClose = () => {
        this.setState(
            {
                "show": false
            }
        )
    }

    profileedit = () => {
        this.setState(
            {
                "show": true
            }
        )
    }
    handleChange = async (e) => {
        if (e.target.name === "ProfileImage") {
            if (e.target.files[0]) {
                console.log("IT IS CUMNG INSIDE PROFILE PIC CHANGE", e.target.files[0]);
                var profilePhoto = e.target.files[0];
                var data = new FormData();
                data.append('image', profilePhoto);
                await this.props.imageUpload(data);

                this.setState(
                    {
                        ProfileImage: this.props.imageupload_url
                    }
                )
                await this.props.imageDownload(this.props.imageupload_url);
                this.setState({
                    ProfileImagePreview: this.props.imagePreviewresponse

                })
            }


        }
        else {
            e.preventDefault();

            const target = e.target;
            const name = target.name;
            const value = target.value;
            console.log("value change is ", target.value);
            this.setState({
                [name]: value
            });
        }
    }
    dashboardNavigate = (e) => {
        e.stopPropagation();
        this.props.history.push("/dashboard");
    }

    dashboardNavigate1 = (e) => {
        this.props.viewList( (status, feeds) => {})
        localStorage.setItem('searchnewhandle',localStorage.getItem('searchuserhandle'))
        e.stopPropagation();
        localStorage.setItem('listcheck','true');
//        localStorage.setItem('searchnewhandle',this.state.userdetails.userhandle)

        
        this.props.history.push("/dashboard");
    }
onFollow = async () => {
        let data = {
            "userid": localStorage.getItem('cookie1'),
            "userid_to_follow": this.state.userid
        }
        await this.props.follow(data);

        this.setState(
            {
                followDisplay: false
            }
        )
        console.log("display is", this.state.followDisplay);
    }

    getImage = (url) => {
      return "https://picsum.photos/id/1/200/200";
    }

    deleteTweet = e => {
        
    }
     
    render() {
        let redirectVar = null;
        if (!localStorage.getItem('cookie2')) {
            redirectVar = <Redirect to="/TwitterHome" />;
        }

        let profileImageData = <img className="img-style" src="https://img.freepik.com/free-icon/user-filled-person-shape_318-74922.jpg?size=338c&ext=jpg" alt="logo" />
        if (this.state.ProfileImagePreview) {
            profileImageData = <img className="img-style" src={this.state.ProfileImagePreview} alt="logo" />
        }
        var style = {
            color: "rgba(29,161,242,1.00)",
            fontSize: 30,
            paddingLeft: "10px"
        };
        return (
            <div class="container-fluid w-87">
                {redirectVar}
                <div className="row">
                    <div class="col-md-3 border">
                        <ul class="list-unstyled" style={{ position: "fixed" }}>
                            <li class="m-4 h6 font-weight-bold">
                                <a>
                                    <span style={style}>
                                        {" "}
                                        <i class="fab fa-twitter"></i>{" "}
                                    </span>{" "}
                                </a>
                            </li>
                            <li class="m-4 h6 font-weight-bold">
                                <a onClick={this.homecheck}>
                                    <div className="hoveritem">
                                        <i class="fas fa-home icon_pad"></i>Home
                </div>
                                </a>
                            </li>
                            <li class="m-4 h6 font-weight-bold">
                                <a onClick={this.explorecheck}>
                                    <div className="hoveritem">
                                        <i class="fas fa-hashtag icon_pad"></i> Explore
                </div>
                                </a>
                            </li>
                            <li class="m-4 h6 font-weight-bold">
                                <a onClick={this.notificationcheck}>
                                    <div className="hoveritem">
                                        <i class="far fa-bell icon_pad"></i>Notifications
                </div>
                                </a>
                            </li>
                            <li class="m-4 h6 font-weight-bold">
                                <a onClick={this.messagescheck}>
                                    <div className="hoveritem">
                                        <i class="far fa-envelope icon_pad"></i>Messages
                </div>
                                </a>
                            </li>
                            <li class="m-4 h6 font-weight-bold">
                                <a onClick={this.bookmarkscheck}>
                                    <div className="hoveritem">
                                        <i class="far fa-bookmark icon_pad"></i>Bookmarks
                </div>
                                </a>
                            </li>
                            <li class="m-4 h6 font-weight-bold">
                                <a onClick={this.listcheck}>
                                    <div className="hoveritem">
                                        <i class="far fa-list-alt icon_pad"></i>Lists
                </div>
                                </a>
                            </li>
                            <li class="m-4 h6 font-weight-bold">
                                <a onClick={this.profilecheck}>
                                    <div className="hoveritem">
                                        <i class="fas fa-user-circle icon_pad"></i>Profile
                </div>
                                </a>
                            </li>
                            <li class="m-4 h6 font-weight-bold">
                                <a>
                                    <div className="hoveritem">
                                        <i class="far fa-chart-bar icon_pad"></i>Analytics
                </div>
                                </a>
                            </li>
                            <li class="m-4 h6 font-weight-bold">
                                <button type="button" class="btn btn-primary">
                                    Tweet
              </button>
                            </li>
                        </ul>
                    </div>
                    <div class="col-md-5">
                        <div>
                            <div>
                                <div class="row ml-4 mt-2" onClick={this.dashboardNavigate}>
                                    <i class="fas fa-long-arrow-alt-left d-inline-block" style={{ fontSize: "3em" }}></i>
                                    <h3 class="mt-2 ml-4">Tweet</h3>
                                </div>
                                <div className="jumbotron345">

                                    {profileImageData}

                                    <div className="jumbo2">
                                        <div className="para34">

                                            <div className="in">
                                                <p className="para2">{this.state.userdetails.profilename}</p>

                                                
                                                <button onClick={this.profileedit} style={{color:'black',fontSize:'18px'}}>Edit Profile</button>

                                                <div style={{color:'black',fontSize:'18px'}}> {this.state.followDisplay && <button onClick={this.onFollow}>Follow</button>}</div>

                                                
                                                 <button style={{color:'black',fontSize:'18px'}} onClick={this.dashboardNavigate1 }>View List</button>
                                                
                                           
                                            </div>
                                            <p className="para3">{this.state.userdetails.userhandle}</p><br />
                                            <div className="in">
                                                <span className="parafirstlastname2"><b>First Name</b>  {this.state.userdetails.firstname} </span>
                                                <span className="parafirstlastname6"><b>Last Name</b>   {this.state.userdetails.lastname}</span>
                                            </div><br />
                                            <div className="in">
                                                <span className="parafirstlastname2"><b>Born </b>           {this.state.dateofbirth}</span>
                                                <span className="parafirstlastname6"><b>Joined </b>         {this.state.created_at}</span>
                                            </div><br />

                                            <div className="in">
                                                <p className="increasefont"><Link to="/followers">{this.state.Followers} Followers</Link></p>
                                                <p className="increasefont parafirstlastname6"><Link to="/followers">{this.state.Following} Following</Link></p>
                                            </div><br />

                                            <span className="parafirstlastname2"> <b>City</b>           {this.state.userdetails.city}</span>
                                            <span className="parafirstlastname4"><b>State</b>           {this.state.userdetails.state} </span>
                                            <span className="parafirstlastname5"><b>Zipcode</b>         {this.state.userdetails.zipcode} </span>
                                            <br/> <h6>Tweets</h6>
                                        </div>
                                    </div>
                                    <div>
                                        <Modal className="setModal" show={this.state.show} onHide={this.handleClose} >
                                            <Modal.Header className="item2">
                                                <Modal.Title >Edit Profile</Modal.Title>

                                            </Modal.Header>

                                            <Modal.Body >
                                                <h4>User Name</h4>
                                                <input className="name1" name="username" type="text" defaultValue={this.state.userdetails.username} onChange={this.handleChange}></input>
                                                <h4>Profile Image</h4>
                                                <input className="name1" name="ProfileImage" onChange={this.handleChange} type="file" />
                                                <h4>Bio</h4>
                                                <input className="name34567" type="text" defaultValue={this.state.userdetails.description} onChange={this.handleChange} />
                                                <h4>Website</h4>
                                                <input className="name1" name="Website" defaultValue={this.state.userdetails.website_url} onChange={this.handleChange} type="text"></input>
                                                <h4>Birth date</h4>
                                                <input className="name1" name="dateofbirth" defaultValue={this.state.dateofbirth} onChange={this.handleChange} type="text"></input>
                                                <h4>City</h4>
                                                <input className="name1" name="city" defaultValue={this.state.userdetails.city} onChange={this.handleChange} type="text"></input>
                                                <h4>State</h4>
                                                <input className="name1" name="state" defaultValue={this.state.userdetails.state} onChange={this.handleChange} type="text"></input>
                                                <div className="field1234567" style={{ color: "red" }}>{this.state.IncorrectCredentials}</div>
                                                <h4>Zipcode</h4>
                                                <input className="name1" name="zipcode" defaultValue={this.state.userdetails.zipcode} onChange={this.handleChange} type="text"></input>

                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={this.handleClose}>
                                                    Close
                                      </Button>
                                                <Button variant="primary" onClick={this.updatesProfile}>
                                                    Save Changes
                                      </Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <hr />
            {this.props.userTweets.docs.map((value, index) => {
            return (
                <div class="row border-bottom-1 border-dark-gray mt-2">
                    <div class="row">
                        <div class="col-md-2" onClick={this.handleTweetClick} data-tweetId={value._id}>
                            <div class="mt-2 twitter-avatar">
                                <img src={this.getImage(value.images[0])} class="rounded-circle" />
                            </div>
                        </div>
                        <div class="col-md-9">
                            <div class="row d-inline-block w-100">
                                <div class="twitter-name d-inline-block" data-userId={value.by} onClick={this.triggerProfileView}><a href="">{value.userName}</a></div>
                                <div class="twitter-tick ml-1 d-inline-block">
                                    <div dir="auto" class="css-901oao r-jwli3a r-18u37iz r-1q142lx r-1qd0xha r-a023e6 r-16dba41 r-ad9z0x r-bcqeeo r-qvutc0"><svg viewBox="0 0 24 24" aria-label="Verified account" class="r-jwli3a r-4qtqp9 r-yyyyoo r-1xvli5t r-9cviqr r-dnmrzs r-bnwqim r-1plcrui r-lrvibr">
                                            <g>
                                                <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path>
                                            </g>
                                        </svg></div>
                                </div>
                                <div class="twitter-handle ml-2 d-inline-block">{value.twitterHandle}</div>
                                <div class="dot-separator ml-2 mr-2 d-inline-block"><span class="">.</span></div>
                                <div class="tweet-time d-inline-block">40m</div>
                                <div class="dropdown d-inline-block float-right">
                                    <a class="dropdown-toggle" href="#" role="button" id="dropdownMenu1" data-toggle="dropdown" aria-expanded="false"> </a>
                                    <div class="dropdown-menu pull-left" aria-labelledby="dropdownMenu1">
                                        <a class="dropdown-item mt-10" href="#">
                                            <i class="fas fa-code"></i> 
                                            <span class="ml-2 mt-2">Embed Tweet</span>
                                        </a>
                                        <a class="dropdown-item" href="#" data-tweetId={value._id} onClick={this.deleteTweet}>
                                            <i class="fas fa-ban"></i>
                                            <span class="ml-2 mt-2">Delete Tweet</span>  
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-2">{value.content}</div>
                            { value.images.length > 0 ? <div class="row mt-2 tweet-images"><img src={value.images[0]} class="rounded" /></div> : <br></br> }
                            <div class="row d-inline-block w-100 mt-3 mb-2">
                                <div class="row">
                                    <div class="col-md-3" onClick={this.getCurrentTweetId} data-tweetId={value._id} data-count={value.num_comments}>
                                        <i href="#myModal" role="button" data-toggle="modal" class="far fa-comment"></i>
                                        <span class="comment-count ml-1">{value.num_comments}</span>
                                    </div>
                                    <div class="col-md-3" onClick={this.reTweet} data-tweetId={value._id} data-count={value.reTweetCount}>
                                        <i class="fas fa-retweet"></i>
                                        <span class="retweet-count ml-1">{value.reTweetCount}</span>
                                    </div>
                                    <div class="col-md-3" onClick={this.updateLikeCount} data-tweetId={value._id} data-count={value.likeCount}>
                                        <i class={value.likes.indexOf(localStorage.getItem('cookie1')) > -1 ? "fas fa-heart" : "far fa-heart"}></i>
                                        <span class="like-count ml-1">{value.likeCount}</span>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="dropdown">
                                        <a  type="text" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i class="far fa-share-square"></i>
                                        </a>
                                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <a class="dropdown-item" href="#" data-tweetId={value._id} onClick={this.bookmarkTweet}>
                                                <i class="far fa-bookmark"></i>
                                                <span class="ml-2">Add to bookmark</span>  
                                            </a>
                                        </div>
                                    </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                );
            })}
                    </div>
                    <div class="col-md-3 border">
                    <div class="mt-2">
                    <Search />
                    <div class="row mt-4 ml-3">
                        <img src={imgg} class="responsive"></img>
                    </div>
                    </div>
                </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userTweets: state.profile.userTweets,
        profiledetails: state.profile.profiledetails,
        imagePreviewresponse: state.image.imagePreviewresponse,
        imageupload_url: state.image.imageupload_url,
        isfollowingvalue: state.followingfollower.isfollowing,
        followvalue: state.followingfollower.follow,
        unfollowvalue: state.followingfollower.unfollow,
        follower_no: state.followingfollower.followerCount,
        following_no: state.followingfollower.followingCount

    };
}
export default connect(
    mapStateToProps,
    { viewList,clearcheck ,profileaction, getLoggedInUserTweets, updateProfile, imageDownload, imageUpload, isfollowing, follow, followingCount, followerCount, unfollow }
)(Profile);
