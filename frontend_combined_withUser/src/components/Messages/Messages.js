import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import ComposeMessage from './ComposeMessage';
import { getInboxMessages } from '../../redux/actions/message_actions';
import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../css/message.css';

class Messages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sentMsgs: [],
            inboxMsgs: [],
            hide_sentMsgs: true,
            hide_inboxMsgs: false
        }
    }

    async componentDidMount() {
        var email = null;
        email = localStorage.getItem('cookie2');
        await this.props.getInboxMessages(email);
        if (this.props.msgs.msgs) {
            let array = this.props.msgs.msgs;
            let arrayLength = array.length;

            let inbox = [];
            let sent = [];
            for (var i = 0; i < arrayLength; i++) {
                if (array[i].to === email) {
                    inbox.push(array[i]);
                }
                if (array[i].from === email) {
                    sent.push(array[i]);
                }
            }
            this.setState({ inboxMsgs: inbox, sentMsgs: sent });
        }

    }

    handleSelect = async (key) => {
        var email = null;
        email = localStorage.getItem('cookie2');
        if (key === "second") {
            await this.props.getInboxMessages(email);
            let array = this.props.msgs.msgs;
            let arrayLength = array.length;
            let sent = [];
            for (var i = 0; i < arrayLength; i++) {
                if (array[i].from === email) {
                    sent.push(array[i]);
                }
            }
            this.setState({ sentMsgs: sent });
        }
        if (key === "first") {
            await this.props.getInboxMessages(email);
            let array = this.props.msgs.msgs;
            let arrayLength = array.length;
            let inbox = [];
            for (var i = 0; i < arrayLength; i++) {
                if (array[i].to === email) {
                    inbox.push(array[i]);
                }
            }
            this.setState({ inboxMsgs: inbox });
        }
    }

    render() {
        let redirectVar = null;
        if (!localStorage.getItem('cookie2')) {
            redirectVar = <Redirect to="/TwitterHome" />;
        }
        let InboxClick = (e) => {
            this.setState(
                {
                    hide_sentMsgs: true,
                    hide_inboxMsgs: false
                }
            )
        }
        let SentMsgsClick = (e) => {
            this.setState(
                {
                    hide_sentMsgs: false,
                    hide_inboxMsgs: true
                }
            )
        }

        let inboxDiv = this.state.inboxMsgs.map((record, index) => {
            let hrefLink = "#href" + index;
            let id = "href" + index;
            let str = record.timestamp;
           // let time = str.substring(0, str.indexOf('('));
           let time = str.substring(4, 10).concat(',').concat(str.substring(16, 24));
            return (
                <div class="card1">
                    <div class="card-header">
                        <div className="row">
                            <br/>
                            <div className="col-sm-6 float-left">
                            <div className="displaybold"> From: {record.from}</div>
                               {time}
                            </div>
                            <br />
                            <div className="col-sm-6 float-right">
                                {record.message}
                            </div>
                            <br />
                           
                        </div>
                    </div>
                </div>
            )
        });

        let sentboxDiv = this.state.sentMsgs.map((record, index) => {
            let hrefLink = "#href" + index;
            let id = "href" + index;
            let str = record.timestamp;
            //let time = str.substring(0, str.indexOf('('));
            let time = str.substring(4, 10).concat(',').concat(str.substring(16, 24));
            // +","+substring(16,22);
            return (
                <div className="card1">
                    <div className="card-header">
                        <div className="row">
                            <br/>
                            <div className="col-sm-6 float-left">
                               <div className="displaybold"> To: {record.to}</div>
                                {time}
                            </div><br />
                            <div className="col-sm-6 float-right">
                                {record.message}
                            </div>
                            <br />
                          
                        </div>
                    </div>

                </div>
            )
        });

        return (
            <div>
                {redirectVar}
                <div>
                    <div>
                        <nav className="navbar">
                            <div className="container-fluid">
                                <div className="navbar-header">
                                    <a className="navbar-brand" href="/TwitterHome"></a>
                                </div>
                                <div>
                                </div>
                            </div>
                        </nav>
                        <div className="row">
                            
                            <div className="col-sm-3">
                                <h3 style={{  marginLeft:"28px" }}className="h2-id">Messaging</h3>

                                <Row>
                                    <button className="btn btn-primary" style={{ marginTop: "10px", marginLeft:"30px" }} data-toggle="modal" data-target="#composeMessage">
                                        <i className="fa fa-plus" aria-hidden="true">
                                        </i>Message</button><br /><br />
                                    <ComposeMessage />
                                </Row><br/>
                                <li className="removelist" style={{  marginLeft:"28px" }} onClick={InboxClick} ><Link to="/Message">Inbox</Link></li><br />
                                <li className="removelist" style={{  marginLeft:"28px" }} onClick={SentMsgsClick} ><Link to="/Message">Sent</Link></li><br />

                            </div>
                            <div className="col-sm-9">
                                {!this.state.hide_inboxMsgs && <div>
                                    <h3>Inbox Messages</h3>
                                    {inboxDiv}
                                </div>}
                                {!this.state.hide_sentMsgs && <div >
                                    <h3>Sent Messages</h3>
                                    {sentboxDiv}
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = state => ({
    msgs: state.inbox.msgs
});

export default connect(mapStateToProps, { getInboxMessages })(Messages);