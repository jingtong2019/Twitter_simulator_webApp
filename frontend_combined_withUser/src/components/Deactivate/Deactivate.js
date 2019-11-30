import React, { Component } from 'react';
import { deleteuser } from '../../redux/actions/signup_login_actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

class Deactivate extends Component {
    constructor() {
        super();
        this.state = {
            password: ""
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange = (e) => {
        console.log("password is ", e.target.value);
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }
    onDeactivate = async (e) => {
        e.preventDefault();
        let username = localStorage.getItem("cookie2");
        let post = {
            username: username,
            password: this.state.password,
        }

        await this.props.deleteuser(post);
        if (this.props.deleteSuccess) {
            localStorage.clear();
            window.location.replace('/DeactivatedPage');
        } else {
            this.setState(
                {
                    IncorrectCredentials: "Incorrect Credentials"
                }
            )
        }

    }
    render() {

        let redirectVar = null;
        if (!localStorage.getItem('cookie2')) {
            redirectVar = <Redirect to="/TwitterHome" />;
        }
        return (
            <div >
                {redirectVar}
                <nav className="navbar">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="/TwitterHome">Home</a>
                            <span className="twitter"></span>
                        </div>
                    </div>
                </nav>
                <div className="login">
                    <p className="deactivate">To Deactivate your account</p>
                    <p className="deactivate">Confirm your password</p>
                    <div className="field1234567890" style={{ color: "red" }}>{this.state.IncorrectCredentials}</div><br />
                    <form onSubmit={this.onDeactivate} method="post" autoComplete="off">
                        <div className="form-group">

                            <input className="field12" onChange={this.handleChange} type="password" name="password" placeholder="Password" required />
                        </div>
                        <br></br>
                        <div className="but">
                            <input type="submit" className="loginbutton2" style={{ width: "25%" }} value="Deactivate" />

                        </div>
                        <br></br>
                        <br></br>
                    </form>
                </div>
                <br></br>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        deleteSuccess: state.signin.deleteSuccess
    };
}

export default connect(
    mapStateToProps,
    { deleteuser }
)(Deactivate);
