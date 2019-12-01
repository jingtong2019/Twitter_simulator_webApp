import React, { Component } from "react";
import axios from "axios";
import "./../App.css";
import "./../../node_modules/@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all";
import Search from "./Search";
//import List from "./List";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import imgg from "../components/trends.png";
import MainPage from "./main-page";
import BookmarkComponent from "./bookmark";
import TweetComponent from "./tweet";
import Profile from './Profile';
import Messages from './Messages/Messages';
import Deactivate from './Deactivate/Deactivate';
import { Redirect } from 'react-router';
export default class Sidebar extends Component {
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component

    this.state = {
      home: true,
      explore: false,
      notifications: false,
      messages: false,
      bookmarks: false,
      list: false,
      profile: false,
      more: false,
      testing: false,
      rightpane: true,
      deactivate:false,
      logout:false
    };

    this.currentComponent = this.currentComponent.bind(this);
    this.listcheck = this.listcheck.bind(this);
    this.homecheck = this.homecheck.bind(this);
    this.explorecheck = this.explorecheck.bind(this);
    this.notificationcheck = this.notificationcheck.bind(this);
    this.messagescheck = this.messagescheck.bind(this);
    this.bookmarkscheck = this.bookmarkscheck.bind(this);
    this.profilecheck = this.profilecheck.bind(this);
  }

  homecheck = () => {
    this.setState({
      home: true,
      explore: false,
      notifications: false,
      messages: false,
      bookmarks: false,
      list: false,
      profile: false,
      more: false,
      rightpane: true,
      deactivate:false,
      logout:false
    });
  };

  explorecheck = () => {
    this.setState({
      home: false,
      explore: true,
      notifications: false,
      messages: false,
      bookmarks: false,
      list: false,
      profile: false,
      more: false,
      rightpane: true,
      deactivate:false,
      logout:false
    });
  };

  notificationcheck = () => {
    this.setState({
      home: false,
      explore: false,
      notifications: true,
      messages: false,
      bookmarks: false,
      list: false,
      profile: false,
      more: false,
      rightpane: true,
      deactivate:false,
      logout:false
    });
  };

  messagescheck = () => {
    this.setState({
      home: false,
      explore: false,
      notifications: false,
      messages: true,
      bookmarks: false,
      list: false,
      profile: false,
      more: false,
      rightpane: false,
      deactivate:false,
      logout:false
    });
  };

  bookmarkscheck = () => {
    this.setState({
      home: false,
      explore: false,
      notifications: false,
      messages: false,
      bookmarks: true,
      list: false,
      profile: false,
      more: false,
      rightpane: true,
      deactivate:false,
      logout:false
    });
  };

  bookmarkscheck = () => {
    this.setState({
      home: false,
      explore: false,
      notifications: false,
      messages: false,
      bookmarks: true,
      list: false,
      profile: false,
      more: false,
      rightpane: true,
      deactivate:false,
      logout:false
    });
  };

  listcheck = () => {
    this.setState({
      home: false,
      explore: false,
      notifications: false,
      messages: false,
      bookmarks: false,
      list: true,
      profile: false,
      more: false,
      rightpane: true,
      deactivate:false,
      logout:false
    });
  };

  profilecheck = () => {
    this.setState({
      home: false,
      explore: false,
      notifications: false,
      messages: false,
      bookmarks: false,
      list: false,
      profile: true,
      more: false,
      rightpane: true,
      deactivate:false,
      logout:false
    });
  };
  deactivatecheck=()=>
  {
    this.setState({
      home: false,
      explore: false,
      notifications: false,
      messages: false,
      bookmarks: false,
      list: false,
      profile: false,
      more: false,
      rightpane: true,
      deactivate:true,
      logout:false
    });
  }
   logoutcheck=()=>
  {
    this.setState({
      home: false,
      explore: false,
      notifications: false,
      messages: false,
      bookmarks: false,
      list: false,
      profile: false,
      more: false,
      rightpane: false,
      deactivate:false,
      logout:true
    });
  }
  //Require map search to redux

  currentComponent = () => {

    let userid = localStorage.getItem('cookie1');
    if (this.state.home) return <MainPage />;
    else if (this.state.bookmarks) return <BookmarkComponent />;
    else if (this.state.explore) return <p>Explore Component</p>;
    else if (this.state.notifications) return <p>Notifications Component</p>;
    else if (this.state.messages) return <p><Messages /></p>;
    else if (this.state.bookmarks) return <p>Analytics component</p>;
    //analytic=s chnage
    else if (this.state.list) return <p>List Component</p>;
    //<List />
    else if (this.state.profile) return <p><Profile userid={userid} /></p>;
    else if(this.state.deactivate) {return  <Redirect to={{ pathname: '/Deactivate'}}/>  }
    else if(this.state.logout) { localStorage.clear();
    return <Redirect to={{
      pathname: '/TwitterHome'
  }}
  />
    }
    else return <p>No component assigned</p>;
  };

  render() {

    var rightcomponent;
    var style = {
      color: "rgba(29,161,242,1.00)",
      fontSize: 30,
      paddingLeft: "10px"
    };
    if (this.state.rightpane)
      rightcomponent = (
        <div class="mt-2">
          <Search />
          <div class="row mt-4 ml-3">
            <img src={imgg} class="responsive"></img>
          </div>
        </div>
      );
    else rightcomponent = null;

    return (
      <div class="container-fluid w-87">
        <div class="row">
          <div class="col-md-3 border">
            <ul class="list-unstyled">
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
                <a onClick={this.deactivatecheck}>
                  <div className="hoveritem">
                    <i class="fas fa-ruler-combined icon_pad"></i>Deactivate
                  </div>
                </a>
              </li>

              <li class="m-4 h6 font-weight-bold">
                <a onClick={this.logoutcheck}>
                  <div className="hoveritem">
                 <i class="fas fa-sign-out-alt icon_pad"></i>Logout
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
          {this.currentComponent()}
          <div class="col-md-3 border">{rightcomponent}</div>
        </div>
      </div>
    );
  }
}
