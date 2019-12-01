import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  postMessage } from '../../redux/actions/message_actions';
import {Redirect} from 'react-router';
class ComposeMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
    }
    onChange = (event, { newValue }) => {
        
        this.setState({
            value: newValue
        });
    };

    saveMessage = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
       let data = { "to": formData.get('to'), 
                     "from": formData.get('from'), 
                     "message": formData.get('msg')
                    };
                    console.log("in save message before requesting");
        this.props.postMessage(data);
        this.inputElement.click();
        
    }

    render() {
        let redirectVar = null;
        if (!localStorage.getItem('cookie2')) {
            redirectVar = <Redirect to="/TwitterHome" />;
        } 

        var fromEmail = null;
        fromEmail = localStorage.getItem('cookie2');

        const { value } = this.state;
        const inputProps = {
            value,
            onChange: this.onChange,
            className: "form-control",
            required:"required",
            name:"to"
        };
      return (
            <div className="modal fade" id="composeMessage" tabIndex="-1" role="dialog" aria-labelledby="composeMessageLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            {redirectVar}
                            <h5 className="modal-title" id="composeMessageLabel">New Message</h5>
                            <button type="button" className="close" ref={input => this.inputElement = input} data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={this.saveMessage} method="post">
                                <div className="form-group row">
                                    <label htmlFor="from" className="col-sm-2 col-form-label">From:</label>
                                    <div className="col-sm-7">
                                        <input type="text" className="form-control" name="from" value={fromEmail} readOnly />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="to" className="col-sm-2 col-form-label">To:</label>
                                    <div className="col-sm-7">
                                    <input type="text" className="form-control" name="to"  />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="mesg" className="col-sm-2 col-form-label">Message:</label>
                                    <div className="col-sm-7">
                                        <textarea className="form-control" id="msg" name="msg" rows="3"></textarea>
                                    </div>
                                </div>
                                <div className="modal-footer form-group">
                                    <button type="submit" className="btn btn-primary">Send Message</button>
                                </div>

                            </form>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    emailListStore : state.inbox.emailList
});

export default connect(mapStateToProps, {  postMessage })(ComposeMessage);