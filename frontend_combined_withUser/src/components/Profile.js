import React, { Component } from 'react';
import { profileaction, updateProfile } from '../redux/actions/profile';
import { connect } from 'react-redux';
import './css/profile.css';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { imageDownload, imageUpload } from '../redux/actions/image_actions';
import { Redirect } from 'react-router';

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
            Followers: 2,
            Following: 3,
            firstname: "",
            lastname: "",
            city: "",
            state: "",
            zipcode: "",
            username: "",
            IncorrectCredentials:""
        }

    }
    async componentDidMount() {

        let post =
        {
            "userid": this.props.userid
        }
        await this.props.profileaction(post);
        if (this.props.profiledetails) {

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

        const validDate=RegExp("([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))");
        console.log("the zipcode is ",this.state.zipcode ,validZipcode.test(this.state.zipcode ));
        if (this.state.zipcode && !validZipcode.test(this.state.zipcode )) {
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
            let userid = this.props.userid;
         
            if (this.state.ProfileImage) {
                axios.defaults.withCredentials = true;
                data = {
                    userID: userid,
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
                axios.defaults.withCredentials = true;
                data = {
                    userID: userid,
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
    render() {

        let redirectVar = null;
        if (!localStorage.getItem('cookie2')) {
            redirectVar = <Redirect to="/TwitterHome" />;
        }

        let profileImageData = <img className="img-style" src="https://img.freepik.com/free-icon/user-filled-person-shape_318-74922.jpg?size=338c&ext=jpg" alt="logo" />
        if (this.state.ProfileImagePreview) {
            profileImageData = <img className="img-style" src={this.state.ProfileImagePreview} alt="logo" />
        }

        return (
            <div>
                {redirectVar}
                <div>
                   <div>
                     <div className="jumbotron345">

                            {profileImageData}

                            <div className="jumbo2">
                                <div className="para34">
                                    <br />
                                   <br/>
                                    <div className="in">
                                        <p className="para2">{this.state.userdetails.profilename}</p>
                                        <button onClick={this.profileedit} className="para6">Edit Profile</button>
                                    </div><br /><br />
                                    <p className="para3">{this.state.userdetails.userhandle}</p><br /><br /><br />
                                    <div className="in">
                                        <p className="parafirstlastname2"><b>First Name</b>  {this.state.userdetails.firstname} </p>
                                        <p className="parafirstlastname6"><b>Last Name</b>   {this.state.userdetails.lastname}</p>
                                    </div><br />
                                    <p className="parafirstlastname2"><b>Born </b>           {this.state.dateofbirth}</p><br />
                                    <p className="parafirstlastname2"><b>Joined </b>         {this.state.created_at}</p><br />

                                    <p className="parafirstlastname2">{this.state.Followers} <b>Followers</b></p><br />
                                    <p className="parafirstlastname2">{this.state.Following} <b>Following</b></p><br />

                                    <p className="parafirstlastname2"> <b>City</b>           {this.state.userdetails.city}</p><br />
                                    <p className="parafirstlastname2"><b>State</b>           {this.state.userdetails.state} </p><br />
                                    <p className="parafirstlastname2"><b>Zipcode</b>         {this.state.userdetails.zipcode} </p><br />

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
                                        <input className="name34567" type="text" defaultValue={this.state.userdetails.description}  onChange={this.handleChange} />
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
        )
    }
}

const mapStateToProps = (state) => {
    return {
        profiledetails: state.profile.profiledetails,
        imagePreviewresponse: state.image.imagePreviewresponse,
        imageupload_url: state.image.imageupload_url

    };
}
export default connect(
    mapStateToProps,
    { profileaction, updateProfile, imageDownload, imageUpload }
)(Profile);