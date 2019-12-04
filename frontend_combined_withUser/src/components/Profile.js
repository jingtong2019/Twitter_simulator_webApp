import React, { Component } from 'react';
import { profileaction, updateProfile } from '../redux/actions/profile';
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
        e.stopPropagation();
        localStorage.setItem('listcheck','true');
        localStorage.setItem('searchuserhandle',this.state.userdetails.userhandle)
        
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

                                                
                                                {this.state.followDisplay  && <button style={{color:'black',fontSize:'18px'}} onClick={this.dashboardNavigate1 }>View List</button>}
                                                
                                           
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
    { viewList,clearcheck ,profileaction, updateProfile, imageDownload, imageUpload, isfollowing, follow, followingCount, followerCount, unfollow }
)(Profile);
