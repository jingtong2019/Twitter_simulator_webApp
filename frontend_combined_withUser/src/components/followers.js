import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { getfollowers, getfollowing } from '../redux/actions/followerfollowing-actions';
import { Link } from 'react-router-dom';
import Pagination from './pagination/Pagination';
import Leftpane from './Leftpane';

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
        const followdata = this.state.followerdata;
        const followingdata= this.state.followingdata;
        return (
            <div className="row">
                <div className="col-md-4">
                    <Leftpane/>
                </div>
                <div className="col-md-4">
                    <div >
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
                <div className="col-md-4">

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