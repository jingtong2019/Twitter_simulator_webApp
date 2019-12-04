import React from "react";
import InfiniteScroll from 'react-infinite-scroller';
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import "@fortawesome/fontawesome-free/css/all.css";
import axios from 'axios';
import Search from "./Search";
import imgg from "../components/trends.png";


var style = {
  color: "rgba(29,161,242,1.00)",
  fontSize: 30,
  paddingLeft: "10px"
};
class Newcomponentforsearch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      feeds: []
    };

    this.updateLikeCount = this.updateLikeCount.bind(this);
    this.reTweet = this.reTweet.bind(this);
    this.replyToTweet = this.replyToTweet.bind(this);
    this.followUser = this.followUser.bind(this);
  }

  componentDidMount() {

    let post = {
      hashtag: localStorage.getItem('hashtag')
    }

   axios.post('http://ec2-54-67-17-39.us-west-1.compute.amazonaws.com:3001/getTweetsByHashtags',post)
    .then(response => {
        console.log("Status Code : ====> ",response.status);
        if(response.status === 200 ){
          console.log("gettweetsbyhashtags response", response.data.result)
         this.setState(
          {
            feeds: response.data.result
          }
        )
        console.log("feeds are",this.state.feeds);
      }
    }).catch(err => {
      console.log('get hashtag errors: 1')
      console.log(' hasgtag :', err)
    });
  }
   dashboardNavigate = (e) => {
        e.stopPropagation();
        this.props.history.push("/dashboard");
    }
  updateLikeCount = e => {
    const tweetId = e.currentTarget.getAttribute("data-tweetId");
    const likeCount = e.currentTarget.getAttribute("data-count");
    var tweetData = this.props.feeds.feeds.docs.filter(function (obj) {
      return obj._id === tweetId;
    });
    var isLiked = tweetData.likes.indexOf(this.props.accounts.user._id) > -1 ? true : false;
    if (isLiked) {
      this.props.actions.unlikeTweet("this.props.accounts.user._id", tweetId, status => {
        // check status and act
      });
    } else {
      this.props.actions.likeTweet("this.props.accounts.user._id", tweetId, status => {
        // check status and act
      });
    }
  }

  reTweet = e => {
    const tweetId = e.currentTarget.getAttribute("data-tweetId");
    const reTweetCount = e.currentTarget.getAttribute("data-count");
    this.props.actions.reTweet("this.props.accounts.user._id", tweetId, status => {

    });
  }

  replyToTweet = e => {
    const tweetId = e.currentTarget.getAttribute("data-tweetId");
    const replyToTweetCount = e.currentTarget.getAttribute("data-count");
    // get message body
    var body = "body";
    this.props.actions.replyToTweet("this.props.accounts.user._id", tweetId, body, status => {

    });
  }

  followUser = e => {
    const userId = e.currentTarget.getAttribute("data-userId");
    this.props.actions.followUser("this.props.accounts.user._id", userId, status => {

    });
  }

  getImage = (url) => {
    console.log(url);
  }

  
  render() {

    
    let current=this.state.feeds.map((value, index) => {
      return (
          <div class="row border-bottom-1 border-dark-gray mt-2">
              <div class="row">
                  <div class="col-md-2" onClick={this.handleTweetClick} data-tweetId={value._id}>
                      <div class="mt-2 twitter-avatar">
                          <img src={value.images[0]} class="rounded-circle" />
                      </div>
                  </div>
                  <div class="col-md-9">
                      <div class="row d-inline-block w-100">
                          <div class="twitter-name d-inline-block" data-userId={value.by} onClick={this.triggerProfileView}><a href="">{value.UserName}</a></div>
                          <div class="twitter-tick ml-1 d-inline-block">
                              <div dir="auto" class="css-901oao r-jwli3a r-18u37iz r-1q142lx r-1qd0xha r-a023e6 r-16dba41 r-ad9z0x r-bcqeeo r-qvutc0"><svg viewBox="0 0 24 24" aria-label="Verified account" class="r-jwli3a r-4qtqp9 r-yyyyoo r-1xvli5t r-9cviqr r-dnmrzs r-bnwqim r-1plcrui r-lrvibr">
                                      <g>
                                          <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path>
                                      </g>
                                  </svg></div>
                          </div>
                          <div class="twitter-handle ml-2 d-inline-block">{value.UserHandle}</div>
                          <div class="dot-separator ml-2 mr-2 d-inline-block"><span class="">.</span></div>
                          <div class="tweet-time d-inline-block">40m</div>
                           </div>
                       </div>
                </div>
              </div>
            );
        })
    
    
    
    return (
            <div class="row">
                <div className="col-md-3"> 
                <div class="container-fluid w-87">
           
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
                <button type="button" class="btn btn-primary">
                  Tweet
                </button>
              </li>
            </ul>
          </div>
                </div>
                <div className="col-md-5"> 
       <div class="row ml-4 mt-2" onClick={this.dashboardNavigate}>
                                    <i class="fas fa-long-arrow-alt-left d-inline-block" style={{ fontSize: "3em" }}></i>
                                    <h3 class="mt-2 ml-4">Tweet</h3>
                                </div>
                  {current}
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
        );
      }
    }


export default Newcomponentforsearch;


