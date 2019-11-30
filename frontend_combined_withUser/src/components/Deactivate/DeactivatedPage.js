import React, { Component } from 'react';

class DeactivatedPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div >
                <nav className="navbar">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="/TwitterHome">Home</a>
                            <a className="navbar-brand" href="/Login">Log in</a>
                            <span className="twitter"></span>

                        </div>
                    </div>
                </nav>
                <div className="login">
                    <br />
                    <h3>Your account is now deactivated</h3>  <br />
                    <h5>Sorry to see you go.#GoodBye</h5>
                    <br/>  <br/>
                </div>
            </div>
        )
    }
}
export default DeactivatedPage;