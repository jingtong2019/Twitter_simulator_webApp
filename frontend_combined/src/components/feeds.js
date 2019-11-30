import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as feedActions from "../redux/actions/feeds-actions"; 
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
            currentTweetId: ""
        };
        this.getFeeds = this.getFeeds.bind(this);
        this.updateLikeCount = this.updateLikeCount.bind(this);
        this.reTweet = this.reTweet.bind(this);
        this.replyToTweet = this.replyToTweet.bind(this);
        this.followUser = this.followUser.bind(this);
      }

  componentDidMount() {
    this.props.actions.clearFeeds();
    this.getFeeds(1);
  }

  getFeeds(pagenumber) {
    this.props.actions.getUserFeeds(1, pagenumber, (status, feeds) => {
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
    this.setState({ comment: e.target.value });
  }

  updateLikeCount = e => {
      debugger;
    const tweetId = e.currentTarget.getAttribute("data-tweetId");
    const likeCount = e.currentTarget.getAttribute("data-count");
    var tweetData = this.props.feeds.feeds.docs.filter(function( obj ) {
        return obj._id === tweetId;
    });
    // Replace hard coded user id to this.props.accounts.user._id
    var isLiked = tweetData[0].likes.indexOf(12) > -1 ? true : false;
    if (isLiked) {
        this.props.actions.unlikeTweet(12, tweetId, (status, data) => {
            // check status and act

        });
    } else {
        this.props.actions.likeTweet(12, tweetId, (status, data) => {
            // check status and act
        });
    }
  }

  reTweet = e => {
    const tweetId = e.currentTarget.getAttribute("data-tweetId");
    const reTweetCount = e.currentTarget.getAttribute("data-count");
    this.props.actions.reTweet(12, tweetId, (status, data) => {
        // check status and act
    });
  }

  getCurrentTweetId = e => {
    const tweetId = e.currentTarget.getAttribute("data-tweetId");
    this.setState({
        currentTweetId: tweetId
    })
  }

  replyToTweet = e => {
    // get message content from popup modal
    debugger;
    var content = this.state.comment;
    var userId = 12;
    var userImage = "https://picsum.photos/id/1/200/200";
    this.props.actions.replyToTweet(userId, this.state.currentTweetId, content, userImage, (status,data) => {
        // check status and act
    });
  }

  followUser = e => {
    const userId = e.currentTarget.getAttribute("data-userId");
    this.props.actions.followUser("this.props.accounts.user._id", userId, status => {

    });
  }

  getImage = (url) => {
    return "https://picsum.photos/id/1/200/200";
  }

  render() {
      debugger;
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
                debugger;
            return (
                <div class="row border-bottom-1 border-dark-gray mt-2">
                    <div class="row">
                        <div class="col-md-2">
                            <div class="mt-2 twitter-avatar">
                                <img src={this.getImage(value.images[0])} class="rounded-circle" />
                            </div>
                        </div>
                        <div class="col-md-9">
                            <div class="row d-inline-block w-100">
                                <div class="twitter-name d-inline-block">{value.userName}</div>
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
                                        <a class="dropdown-item" href="#" data-userId={value.userId} onClick={this.followUser}>
                                            <i class="fas fa-user-plus"></i>
                                            <span class="ml-2 mt-2">Follow {value.twitterHandle}</span>                                  
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
                            <div class="row mt-2 tweet-images">
                                <img src={value.images[0]} class="rounded" />
                            </div>
                            <div class="row d-inline-block w-100 mt-3 mb-2">
                                <div class="row">
                                    <div class="col-md-3" onClick={this.getCurrentTweetId}>
                                        <i href="#myModal" role="button" data-toggle="modal" class="far fa-comment" data-tweetId={value._id} data-count={value.num_comments}></i>
                                        <span class="comment-count ml-1">{value.num_comments}</span>
                                    </div>
                                    <div class="col-md-3" onClick={this.reTweet}>
                                        <i class="fas fa-retweet" data-tweetId={value._id} data-count={value.reTweetCount}></i>
                                        <span class="retweet-count ml-1">{value.reTweetCount}</span>
                                    </div>
                                    <div class="col-md-3" onClick={this.updateLikeCount}>
                                        <i class={value.likes.indexOf(12) > -1 ? "fas fa-heart" : "far fa-heart"} data-tweetId={value._id} data-count={value.likeCount}></i>
                                        <span class="like-count ml-1">{value.likeCount}</span>
                                    </div>
                                    <div class="col-md-3">
                                        <i class="far fa-share-square"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* {value.comments.map((com, idx) => {
                        return (
                    <div class="row">
                        <div class="col-md-2">
                            <div class="mt-2 twitter-avatar">
                                <img src={com.userImage} class="rounded-circle" />
                            </div>
                        </div>
                        <div class="col-md-10">
                            <textarea cols="55" rows="3" readonly>{com.content}</textarea>
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
                    })} */}
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
      feeds: state.feeds
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
        clearFeeds: bindActionCreators(feedActions.clearFeeds, dispatch)
      }
    };
  }

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(FeedsComponent);



