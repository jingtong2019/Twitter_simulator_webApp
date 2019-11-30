import React, { Component } from 'react';
import { signup } from '../redux/actions/signup_login_actions';
import { connect } from 'react-redux';
import './css/signup.css';

class Signup extends Component {
    constructor() {
        super();
        this.state = {
            firstname: "",
            lastname: "",
            name: "",
            email: "",
            password: "",
            dateofbirth: "",
            description: "",
            city: "",
            state: "",
            zipcode: "",
            EmptyCredentials: "",
            IncorrectCredentials: "",
            date: "",
            month: "",
            year: ""
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange = (e) => {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }
    onValidate = (e) => {
        const validEmailRegex =
                RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
        const validPassword=RegExp(("(?=.{8,})"));

        const validZipcode=RegExp("^[0-9]{5}(?:-[0-9]{4})?$");

      

        if (this.state.email === "" || this.state.email === " " || this.state.password === "" || this.state.password === " " || this.state.name === "" || this.state.name === " ") {
            this.setState(
                {
                    EmptyCredentials: "User name, Email, Password cannot be empty."
                }
            )
            return false;
        }
         if(!validEmailRegex.test(this.state.email))
        {   
            this.setState(
                {
                    IncorrectCredentials: "Incorrect email. Please provide a valid email address"
                }
            )
            return false;
        }
         if(!validPassword.test(this.state.password))
        {
            this.setState(
                {
                    IncorrectCredentials: "Invalid password. Password should be atleast 8 characters"
                }
            )
            return false;
        }
         if(!validZipcode.test(this.state.zipcode))
        {
            this.setState(
                {
                    IncorrectCredentials: "Invalid Zipcode. Valid Zipcodes should be like 90086-1929 or 90086"
                }
            )
            return false;
        }
       
        return true;
        
    }

    onSignup = async (e) => {

        let dateofbirth = this.state.year + "-" + this.state.month + "-" + this.state.date;

        e.preventDefault();
        let isValid = this.onValidate();
        if (isValid) {
           
             let post = {
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password,
                    description: this.state.description,
                    dateofbirth: dateofbirth,
                    firstname: this.state.firstname,
                    lastname: this.state.lastname,
                    city: this.state.city,
                    state: this.state.state,
                    zipcode: this.state.zipcode
                }

                await this.props.signup(post);
                console.log("after response in component" + this.props.signupSuccess);
                if (this.props.signupSuccess) {
                    window.location.replace('/Login');
                } else {
                    this.setState(
                        {
                            IncorrectCredentials: "User Already Exists!!"
                        }
                    )
                }
    }
    }
    render() {

        return (
            <div >
                <nav className="navbar">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="/TwitterHome">Home</a>
                            <span className="twitter"></span>
                        </div>
                    </div>
                </nav>
                <div className="signup">
                    <p className="field1234">Create your account </p>
                    <div className="field1234567" style={{ color: "red" }}>{this.state.EmptyCredentials}</div>
                    <div className="field1234567" style={{ color: "red" }}>{this.state.IncorrectCredentials}</div><br/>
                    <div className="overall">
                        <div className="firstlast">
                            <b>First Name </b><input type="text" className="firstname" onChange={this.handleChange} placeholder="First Name" name="firstname" />
                            <b>Last Name </b><input type="text" className="firstname" onChange={this.handleChange} placeholder="Last Name" name="lastname" />
                        </div><br /><br />
                        <label><b>User Name</b></label>
                        <input type="text" className="name1" onChange={this.handleChange} name="name" />
                        <label><b>Email</b></label>
                        <input type="email" className="name1" onChange={this.handleChange} name="email" />
                        <label><b>Password</b></label>
                        <input type="password" className="name1" onChange={this.handleChange} name="password" />
                        <label><b>Date of Birth</b></label>
                        <div className="row">
                            <div className="col-md-4 name2">
                                <p><b>Month</b></p>
                                <select className="form-control" onChange={this.handleChange} name="month">
                                    <option value="">Select</option>

                                    <option value="1">January</option>
                                    <option value="2">February</option>
                                    <option value="3">March</option>
                                    <option value="4">April</option>
                                    <option value="5">May</option>
                                    <option value="6">June</option>
                                    <option value="7">July</option>
                                    <option value="8">August</option>
                                    <option value="9">September</option>
                                    <option value="10">October</option>
                                    <option value="11">November</option>
                                    <option value="12">December</option>
                                </select>
                            </div>
                            <div className="col-md-4 name2">
                                <p><b>Date</b></p>
                                <select className="form-control" onChange={this.handleChange} name="date">
                                    <option value="">Select</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                    <option value="24">24</option>
                                    <option value="25">25</option>
                                    <option value="26">26</option>
                                    <option value="27">27</option>
                                    <option value="28">28</option>
                                    <option value="29">29</option>
                                    <option value="30">30</option>
                                    <option value="31">31</option>
                                </select>
                            </div>
                            <div className="col-md-4 name2">
                                <p><b>Year</b></p>
                                <select className="form-control" onChange={this.handleChange} name="year">
                                    <option value="">Select</option>
                                    <option value="1988">1988</option>
                                    <option value="1989">1989</option>
                                    <option value="1990">1990</option>
                                    <option value="1991">1991</option>
                                    <option value="1992">1992</option>
                                    <option value="1993">1993</option>
                                    <option value="1994">1994</option>
                                    <option value="1995">1995</option>
                                    <option value="1996">1996</option>
                                    <option value="1997">1997</option>
                                    <option value="1998">1998</option>
                                    <option value="1999">1999</option>
                                    <option value="2000">2000</option>
                                    <option value="2001">2001</option>
                                    <option value="2002">2002</option>
                                    <option value="2003">2003</option>
                                    <option value="2004">2004</option>
                                    <option value="2005">2005</option>
                                    <option value="2006">2006</option>
                                    <option value="2007">2007</option>
                                    <option value="2008">2008</option>
                                    <option value="2009">2009</option>
                                    <option value="2010">2010</option>
                                    <option value="2011">2011</option>
                                    <option value="2012">2012</option>
                                    <option value="2013">2013</option>
                                    <option value="2014">2014</option>
                                    <option value="2015">2015</option>
                                    <option value="2016">2016</option>
                                    <option value="2017">2017</option>
                                    <option value="2018">2018</option>
                                    <option value="2019">2019</option>
                                </select>
                            </div>

                        </div>
                        <div>
                            <label><b>Describe yourself</b></label>
                            <h6>What makes you special? Don't think too hard,just have fun with it</h6>
                            <label><b>Your bio</b></label>
                            <input type="text" className="name34567" onChange={this.handleChange} name="description" placeholder="Description" />
                        </div><br />
                        <label> <b>Address</b></label><br />
                        <div className="firstlastaddress">

                            <b>City</b>    <input type="text" className="firstnameaddress" placeholder="City" onChange={this.handleChange} name="city" />
                            <b>State</b> <input type="text" className="firstnameaddress" placeholder="State" onChange={this.handleChange} name="state" />
                            <b>Zipcode</b>  <input type="text" className="firstnameaddress" placeholder="Zipcode" onChange={this.handleChange} name="zipcode" />
                        </div>
                        <div className="but1">
                            <button onClick={this.onSignup} className="signupbutton">Sign up</button>
                        </div>
                    </div>
                </div>
                <br></br>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        signupSuccess: state.signin.signupSuccess

    };
}


export default connect(
    mapStateToProps,
    { signup }
)(Signup);