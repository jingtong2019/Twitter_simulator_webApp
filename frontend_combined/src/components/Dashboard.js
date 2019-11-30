import React, { Component } from "react";
import axios from "axios";
import "./../App.css";
import "./../../node_modules/@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all";
import Search from "./Search";
//import List from "./List";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import imgg from "../components/trends.png"
import MainPage from './main-page';
import BookmarkComponent from './bookmark';
import TweetComponent from './tweet';

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
      rightpane:true
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
      rightpane:true
     
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
      rightpane:true
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
      rightpane:true
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
      rightpane:false
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
      rightpane:true
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
      rightpane:true
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
      rightpane:true
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
      rightpane:true
    });
  };

 //Require map search to redux
  

  currentComponent = () => {
  
    if (this.state.home) return <MainPage/>;
    else if (this.state.bookmarks) return <BookmarkComponent/> ;
    else if (this.state.explore) return <p>Explore Component</p>;
    else if (this.state.notifications) return <p>Notifications Component</p>;
    else if (this.state.messages) return <p>Messeges Component</p>;
    else if (this.state.bookmarks) return <p>Analytics component</p>; //analytic=s chnage
    else if (this.state.list) return <p>List Component</p>;  //<List />
    else if (this.state.profile) return <p>profile Component</p>;
    else return <p>No component assigned</p>;
  };

  
  render() {
    var rightcomponent
    var style = { color: "rgba(29,161,242,1.00)", fontSize: 30, paddingLeft:'10px'};
if(this.state.rightpane)
  rightcomponent = 
         <div class="sidenav-right-work">
          <Search />
         <img src={imgg} class="responsive"></img>
        </div>
else
 rightcomponent=null
        
       
        
    return (
      <div>
        <div class="sidenav">
          <a>
            <span style={style}>
              {" "}
              <i class="fab fa-twitter"></i>{" "}
            </span>{" "}
          </a>
          

          <a onClick={this.homecheck}>
            <div className="hoveritem">
              <i class="fas fa-home icon_pad"></i>Home
            </div>
          </a>

          <a onClick={this.explorecheck}>
          <div className="hoveritem">
          <i class="fas fa-hashtag icon_pad"></i> Explore
            </div>
          </a>

          <a onClick={this.notificationcheck}>
          <div className="hoveritem">
          <i class="far fa-bell icon_pad"></i>Notifications
            </div>
          </a>


          <a onClick={this.messagescheck}>
          <div className="hoveritem">
          <i class="far fa-envelope icon_pad"></i>Messages
            </div>
          </a>


          <a onClick={this.bookmarkscheck}>
          <div className="hoveritem">
          <i class="far fa-bookmark icon_pad"></i>Bookmarks
            </div>
          </a>


          <a onClick={this.listcheck}>
          <div className="hoveritem">
          <i class="far fa-list-alt icon_pad"></i>Lists
            </div>
          </a>

          <a onClick={this.profilecheck}>
          <div className="hoveritem">
          <i class="fas fa-user-circle icon_pad"></i>Profile
            </div>
          </a>

{/* Analytics button -Right Redirect Logic on onClick*/}
          {/* <a onClick={}> */}
          <a>
          <div className="hoveritem">
          
          <i class="far fa-chart-bar icon_pad"></i>Analytics
            </div>
          </a>
          
          <button type="button" class="btn btn-primary">Tweet</button> 
          
        </div>

        <div class="main">{this.currentComponent()}</div>



        {rightcomponent}

       
      </div>
    );
  }
}


