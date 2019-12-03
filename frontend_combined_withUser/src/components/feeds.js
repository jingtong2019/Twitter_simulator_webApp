import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { bindActionCreators } from "redux";
import * as feedActions from "../redux/actions/feeds-actions";
import * as tweetActions from "../redux/actions/tweet-actions";
import * as bookmarkActions from "../redux/actions/bookmark-actions"; 
import InfiniteScroll from 'react-infinite-scroller';
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import "@fortawesome/fontawesome-free/css/all.css";

export class FeedsComponent extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
            feeds: [],
            comment:"",
            currentTweetId: "",
            clickedTweetBody: "",
            profileIdToView: -1
        };
        this.getFeeds = this.getFeeds.bind(this);
        this.updateLikeCount = this.updateLikeCount.bind(this);
        this.reTweet = this.reTweet.bind(this);
        this.replyToTweet = this.replyToTweet.bind(this);
        this.unfollowUser = this.unfollowUser.bind(this);
        this.handleTweetClick = this.handleTweetClick.bind(this);
      }

  componentDidMount() {
    this.props.actions.clearFeeds();
    this.getFeeds(1);
  }

  getFeeds(pagenumber) {
      debugger;
    // let userid= localStorage.getItem('cookie1');
    var userid= this.props.signin.loginSuccess.userid;
    this.props.actions.getUserFeeds(parseInt(userid), pagenumber, (status, feeds) => {
      if (status === 'SUCCESS') {
        this.setState({
            feeds: feeds
        });
      } else {
        this.setState({
            feeds: []
        });
      }
    });
  }

  handleTextareaChange = e => {
      e.stopPropagation();
    this.setState({ comment: e.target.value });
  }

  updateLikeCount = e => {
    e.stopPropagation();
    let userId= parseInt(localStorage.getItem('cookie1'));
    const tweetId = e.currentTarget.getAttribute("data-tweetId");
    const likeCount = e.currentTarget.getAttribute("data-count");
    var tweetData = this.props.feeds.feeds.docs.filter(function( obj ) {
        return obj._id === tweetId;
    });
    // Replace hard coded user id to this.props.accounts.user._id
    var isLiked = tweetData[0].likes.indexOf(userId) > -1 ? true : false;
    if (isLiked) {
        this.props.actions.unlikeTweet(userId, tweetId, (status, data) => {
            // check status and act

        });
    } else {
        this.props.actions.likeTweet(userId, tweetId, (status, data) => {
            // check status and act
        });
    }
  }

  reTweet = e => {
    e.stopPropagation();
    const tweetId = e.currentTarget.getAttribute("data-tweetId");
    let userId= parseInt(localStorage.getItem('cookie1'));
    const reTweetCount = e.currentTarget.getAttribute("data-count");
    this.props.actions.reTweet(userId, tweetId, (status, data) => {
        // check status and act
    });
  }

  getCurrentTweetId = e => {
    e.stopPropagation();
    const tweetId = e.currentTarget.getAttribute("data-tweetId");
    this.setState({
        currentTweetId: tweetId
    })
  }

  replyToTweet = e => {
    e.stopPropagation();
    // get message content from popup modal
    var content = this.state.comment;
    let userId= parseInt(localStorage.getItem('cookie1'));
    var userImage = "https://picsum.photos/id/1/200/200";
    this.props.actions.replyToTweet(userId, this.state.currentTweetId, content, userImage, (status,data) => {
        // check status and act
    });
  }

  unfollowUser = e => {
    e.stopPropagation();
    debugger;
    const unfollowedUserId = parseInt(e.currentTarget.getAttribute("data-userId"));
    let userId= parseInt(localStorage.getItem('cookie1'));
    this.props.actions.unfollowUser(userId, unfollowedUserId, status => {

    });
  }

  handleTweetClick = e => {
    e.stopPropagation();
    const tweetId = e.currentTarget.getAttribute("data-tweetId");
    this.setState({
        clickedTweetBody: tweetId
    })
  }

  bookmarkTweet = e => {
    e.stopPropagation();
    const tweetId = e.currentTarget.getAttribute("data-tweetId");
    let userId= parseInt(localStorage.getItem('cookie1'));
    this.props.actions.bookmarkTweet(userId, tweetId, (status, data) => {
        // check status and act
    });
  }

  triggerProfileView = e => {
    const userId = e.currentTarget.getAttribute("data-userId");
    this.setState({
        profileIdToView: parseInt(userId)
    })
  }

  getImage = (url) => {
    return "https://picsum.photos/id/1/200/200";
  }

  render() {
      debugger;
      if (this.state.clickedTweetBody.length > 0)
        return <Redirect to={`/tweet/${this.state.clickedTweetBody}`} tweetId={this.state.clickedTweetBody}/>
      if (this.state.profileIdToView > -1)
        return <Redirect to={`/profile/${this.state.profileIdToView}`} userId={this.state.profileIdToView}/>
    return (
        // <div class="col-md-5 border bg-dark text-white">
        <div>
            <InfiniteScroll
                  pageStart={1}
                  initialLoad={false}
                  threshold={500}
                  loadMore={this.getFeeds.bind(this)}
                  hasMore={this.props.feeds.feeds.hasMore}
                  loader={<div className="loader" key={0}>Loading ...</div>}
                  useWindow={true}
                  >
            {this.props.feeds.feeds.docs.map((value, index) => {
            return (
                <div class="row border-bottom-1 border-dark-gray mt-2">
                    <div class="row">
                        <div class="col-md-2" onClick={this.handleTweetClick} data-tweetId={value._id}>
                            <div class="mt-2 twitter-avatar">
                                <img src={this.getImage(value.images[0])} class="rounded-circle" />
                            </div>
                        </div>
                        <div class="col-md-9">
                            <div class="row d-inline-block w-100">
                                <div class="twitter-name d-inline-block" data-userId={value.by} onClick={this.triggerProfileView}><a href="">{value.userName}</a></div>
                                <div class="twitter-tick ml-1 d-inline-block">
                                    <div dir="auto" class="css-901oao r-jwli3a r-18u37iz r-1q142lx r-1qd0xha r-a023e6 r-16dba41 r-ad9z0x r-bcqeeo r-qvutc0"><svg viewBox="0 0 24 24" aria-label="Verified account" class="r-jwli3a r-4qtqp9 r-yyyyoo r-1xvli5t r-9cviqr r-dnmrzs r-bnwqim r-1plcrui r-lrvibr">
                                            <g>
                                                <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path>
                                            </g>
                                        </svg></div>
                                </div>
                                <div class="twitter-handle ml-2 d-inline-block">{value.twitterHandle}</div>
                                <div class="dot-separator ml-2 mr-2 d-inline-block"><span class="">.</span></div>
                                <div class="tweet-time d-inline-block">40m</div>
                                <div class="dropdown d-inline-block float-right">
                                    <a class="dropdown-toggle" href="#" role="button" id="dropdownMenu1" data-toggle="dropdown" aria-expanded="false"> </a>
                                    <div class="dropdown-menu pull-left" aria-labelledby="dropdownMenu1">
                                        <a class="dropdown-item mt-10" href="#">
                                            <i class="far fa-frown"></i>
                                            <span class="ml-2">Show less often</span>
                                        </a>
                                        <a class="dropdown-item mt-10" href="#">
                                            <i class="fas fa-code"></i> 
                                            <span class="ml-2 mt-2">Embed Tweet</span>
                                        </a>
                                        <a class="dropdown-item" href="#" data-userId={value.by} onClick={this.unfollowUser}>
                                            <i class="fas fa-user-plus"></i>
                                            <span class="ml-2 mt-2">Unfollow {value.twitterHandle}</span>                                  
                                        </a>
                                        <a class="dropdown-item" href="#" data-userId={value.userId}>
                                            <i class="fas fa-volume-mute"></i>
                                            <span class="ml-2 mt-2">Mute {value.twitterHandle}</span>
                                        </a>
                                        <a class="dropdown-item" href="#" data-userId={value.userId}>
                                            <i class="fas fa-ban"></i>
                                            <span class="ml-2 mt-2">Block {value.twitterHandle}</span>  
                                        </a>
                                        <a class="dropdown-item" href="#" data-tweetId={value.tweetId}>
                                            <i class="far fa-flag"></i>
                                            <span class="ml-2 mt-2">Report Tweet</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-2">{value.content}</div>
                            { value.images.length > 0 ? <div class="row mt-2 tweet-images"><img src={value.images[0]} class="rounded" /></div> : <br></br> }
                            <div class="row d-inline-block w-100 mt-3 mb-2">
                                <div class="row">
                                    <div class="col-md-3" onClick={this.getCurrentTweetId} data-tweetId={value._id} data-count={value.num_comments}>
                                        <i href="#myModal" role="button" data-toggle="modal" class="far fa-comment"></i>
                                        <span class="comment-count ml-1">{value.num_comments}</span>
                                    </div>
                                    <div class="col-md-3" onClick={this.reTweet} data-tweetId={value._id} data-count={value.reTweetCount}>
                                        <i class="fas fa-retweet"></i>
                                        <span class="retweet-count ml-1">{value.reTweetCount}</span>
                                    </div>
                                    <div class="col-md-3" onClick={this.updateLikeCount} data-tweetId={value._id} data-count={value.likeCount}>
                                        <i class={value.likes.indexOf(parseInt(localStorage.getItem('cookie1'))) > -1 ? "fas fa-heart" : "far fa-heart"}></i>
                                        <span class="like-count ml-1">{value.likeCount}</span>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="dropdown">
                                        <a  type="text" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i class="far fa-share-square"></i>
                                        </a>
                                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <a class="dropdown-item" href="#" data-tweetId={value._id} onClick={this.bookmarkTweet}>
                                                <i class="far fa-bookmark"></i>
                                                <span class="ml-2">Add to bookmark</span>  
                                            </a>
                                        </div>
                                    </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    {value.comments.map((com, idx) => {
                        return (
                    <div class="row">
                        <div class="col-md-2">
                            <div class="mt-2 twitter-avatar">
                                <img src={com.userImage} class="rounded-circle" />
                            </div>
                        </div>
                        <div class="col-md-10">
                            <textarea cols="55" rows="3" readonly="true">{com.content}</textarea>
                            <div class="row">
                                <div class="col-md-3">
                                    <i class="far fa-comment"></i>
                                    <span class="comment-count">7</span>
                                </div>
                                <div class="col-md-3">
                                    <i class="fas fa-retweet"></i>
                                    <span class="retweet-count">2</span>
                                </div>
                                <div class="col-md-3">
                                    <i class="far fa-heart"></i>
                                    <span class="like-count">12</span>
                                </div>
                                <div class="col-md-3">
                                    <i class="far fa-share-square"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                        );
                    })}
                </div>
                );
            })}
            </InfiniteScroll>
            <div id="myModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3 id="myModalLabel">Add Comment</h3>
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                        </div>
                        <div class="modal-body">
                            <textarea cols="55" rows="3" onChange={this.handleTextareaChange}></textarea>
                        </div>
                        <div class="modal-footer">
                            <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
                            <button class="btn btn-primary" data-dismiss="modal" onClick={this.replyToTweet}>Reply</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

function mapStateToProps(state) {
    return {
      feeds: state.feeds,
      bookmark: state.bookmark,
      signin: state.signin
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      actions: {
        getUserFeeds: bindActionCreators(feedActions.getUserFeeds, dispatch),
        blockFollowing: bindActionCreators(feedActions.blockFollowing, dispatch),
        muteFollowing: bindActionCreators(feedActions.muteFollowing, dispatch),
        likeTweet: bindActionCreators(feedActions.likeTweet, dispatch),
        unlikeTweet: bindActionCreators(feedActions.unlikeTweet, dispatch),
        reTweet: bindActionCreators(feedActions.reTweet, dispatch),
        replyToTweet: bindActionCreators(feedActions.replyToTweet, dispatch),
        clearFeeds: bindActionCreators(feedActions.clearFeeds, dispatch),
        bookmarkTweet: bindActionCreators(bookmarkActions.bookmarkTweet, dispatch),
        unfollowUser: bindActionCreators(tweetActions.unfollow, dispatch)
      }
    };
  }

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(FeedsComponent);



