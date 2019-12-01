import React, { Component } from 'react';
import './css/home.css';
import { Link } from 'react-router-dom';
import { login } from '../redux/actions/signup_login_actions';
import { connect } from 'react-redux';


class TwitterHome extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            EmptyCredentials: "",
            IncorrectCredentials: "",
            profileview: false,
            deactivate: false
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
        if (this.state.username === "" || this.state.username === " " || this.state.password === "" || this.state.password === " ") {
            this.setState(
                {
                    EmptyCredentials: "Email and Password cannot be Empty!!"
                }
            )
            return false;
        }
        return true;
    }


    onLogin = async (e) => {
        e.preventDefault();
        let isValid = this.onValidate();
        if (isValid) {
            let post = {
                username: this.state.username,
                password: this.state.password,
            }

            await this.props.login(post);
            if (this.props.loginSuccess) {
                window.location.replace('/Dashboard');
            } else {
                this.setState(
                    {
                        IncorrectCredentials: "Incorrect Credentials"
                    }
                )
            }
        }
    }
    render() {
        
        return (

            <div>
                 <div style={{ display: "inline-flex" }}>
                    <div className="home-banner-container">
                        <div className="home-page">
                            <div className="para">
                                <label className="imgsearch"></label>
                                <label>Follow your interests.</label>
                            </div>
                            <br></br>
                            <div className="para">
                                <label className="imgppl"></label>
                                <label>Hear what people are talking about.</label>
                            </div>
                            <br></br>
                            <div className="para">
                                <label className="imgmsg"></label>
                                <label>Join the conversation.</label>
                            </div>
                        </div>
                    </div>
                    <div className="rightsidebutton">
                        <div className="fields">
                            {this.state.IncorrectCredentials}
                            <form onSubmit={this.onLogin} method="post" autoComplete="off">
                                <input className="field1" onChange={this.handleChange} type="text" name="username" placeholder="Phone, email or username" required />
                                <input className="field1" onChange={this.handleChange} type="password" name="password" placeholder="password" required />

                                <input type="submit" className="field" value="Log in" />
                            </form>
                        </div>

                        <div className="down">
                            <span className="twitter"></span>
                            <p className="pa">See what’s happening in the world right now</p>
                            <p className="pa2">Join Twitter today.</p>
                            <button className="loginbutton1"> <Link to="/Signup">Sign up</Link></button><br /><br />
                            <button className="loginbutton1"> <Link to="/Login">Log in</Link></button>
                           
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        loginSuccess: state.signin.loginSuccess

    };
}


export default connect(
    mapStateToProps,
    { login }
)(TwitterHome);