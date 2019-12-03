import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { getfollowers, getfollowing } from '../redux/actions/followerfollowing-actions';
import { Link } from 'react-router-dom';
import Pagination from './pagination/Pagination';
import Search from "./Search";
import imgg from "../components/trends.png";

class followers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage:1,
            itemsPerPage:2,
            username: "",
            userhandle: "",
            showfollowers: true,
            showfollowing: false,
            followingdata: [],
            followerdata:[]
         
        }
    }
  async componentDidMount() {
        let username = localStorage.getItem('cookie2');
        let userhandle = localStorage.getItem('cookie3');
        this.setState(
            {
                username: username,
                userhandle: userhandle
            }
        )
        let userID = localStorage.getItem('cookie1');

        await this.props.getfollowers(userID);

        console.log("following data is ",this.props.followerdata);
       if(this.props.followerdata)
       {
        this.setState(
          {
            followerdata: this.props.followerdata
        }
        )
        }
         await this.props.getfollowing(userID);
         console.log("following data is ",this.props.followingdata);
           if(this.props.followingdata)
         {
           this.setState(
            {
               followingdata: this.props.followingdata
         }
        )
        }
        
  }
  dashboardNavigate = (e) => {
    e.stopPropagation();
    this.props.history.push("/dashboard");
}
    render() {
        let followersclick = (e) => {
            this.setState(
                {
                    showfollowers: true,
                    showfollowing: false

                }
            )
        }
        const indexOfLastOrderfollower=this.state.currentPage* this.state.itemsPerPage;
        const indexOfFirstOrderfollower= indexOfLastOrderfollower-this.state.itemsPerPage;
        const follower=this.state.followerdata.slice(indexOfFirstOrderfollower,indexOfLastOrderfollower);
        let followerpaginate=(pageNumber)=>
        {
            this.setState(
                {
                currentPage: pageNumber
                }
            )
        }
        const indexOfLastOrderfollowing=this.state.currentPage* this.state.itemsPerPage;
        const indexOfFirstOrderfollowing= indexOfLastOrderfollowing-this.state.itemsPerPage;
        const following=this.state.followingdata.slice(indexOfFirstOrderfollowing,indexOfLastOrderfollowing);
        let followingpaginate=(pageNumber)=>
        {
            this.setState(
                {
                currentPage: pageNumber
                }
            )
        }
        let followingclick = (e) => {
            this.setState(
                {
                    showfollowers: false,
                    showfollowing: true

                }
            )

        }
        var style = {
            color: "rgba(29,161,242,1.00)",
            fontSize: 30,
            paddingLeft: "10px"
        };
        const followdata = this.state.followerdata;
        const followingdata= this.state.followingdata;
        return (
            <div class="container-fluid w-87">
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
             
                <div className="col-md-5">
                <div class="row ml-4 mt-2" onClick={this.dashboardNavigate}>
                                    <i class="fas fa-long-arrow-alt-left d-inline-block" style={{ fontSize: "3em" }}></i>
                                    <h3 class="mt-2 ml-4">Tweet</h3>
                                </div>
                    <div>
                        <p className="para2">{this.state.username}</p>
                        <p className="para3">{this.state.userhandle}</p><br />
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <p onClick={followersclick} className="li-id"><Link to="/followers">Followers</Link></p>
                        </div>
                        <div className="col-md-6">
                            <p onClick={followingclick} className="li-id"><Link to="/followers">Following</Link></p>
                        </div>

                        {this.state.showfollowers && <div>
                            <ul>
                                {follower.map(
                                    (user) => {
                                        return (
                                            <div className="row addborderdown">
                                                <div className="mt-2 twitter-avatar col-md-3">
                                                    <img src={user.details.profileimage_url} class="rounded-circle" />
                                                </div>
                                                <div className="col-md-9 displayleft">
                                                    <label className="padright">{user.details.username}</label>
                                                    <label>{user.details.userhandle}</label><br/>
                                                    <label>{user.details.description}</label>
                                                </div>
                                                
                                            </div>
                                           
                                        )
                                    }
                              )
                                }
                                  <Pagination usersperpage={this.state.itemsPerPage} totalfollowers={this.state.followerdata.length} paginate={followerpaginate}/>
                            </ul>
                        </div>}

                        {this.state.showfollowing && <div>
                            <ul>
                                {following.map(
                                    (user) => {
                                        return (
                                            <div className="row addborderdown">
                                                <div className="mt-2 twitter-avatar col-md-3">
                                                    <img src={user.details.profileimage_url} class="rounded-circle" />
                                                </div>
                                                <div className="col-md-9 displayleft">
                                                    <label className="padright">{user.details.username}</label>
                                                    <label>{user.details.userhandle}</label><br/>
                                                    <label>{user.details.description}</label>
                                                </div>
                                            </div>

                                        )
                                    }
                                )
                                }
                                <Pagination usersperpage={this.state.itemsPerPage} totalfollowers={this.state.followingdata.length} paginate={followingpaginate}/> 
                            </ul>
                        </div>}

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

const mapStateToProps = state => ({

    followersdata: state.followingfollower.followersdata,
    followingdata: state.followingfollower.followingdata

});

export default connect(mapStateToProps, { getfollowers, getfollowing })(followers);
