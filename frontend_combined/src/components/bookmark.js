import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as feedActions from "../redux/actions/feeds-actions"; 
import * as bookmarkActions from "../redux/actions/bookmark-actions"; 
import InfiniteScroll from 'react-infinite-scroller';
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import "@fortawesome/fontawesome-free/css/all.css";

export class BookmarkComponent extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
            feeds: []
        };
        this.getFeeds = this.getFeeds.bind(this);
        this.updateLikeCount = this.updateLikeCount.bind(this);
        this.reTweet = this.reTweet.bind(this);
        this.replyToTweet = this.replyToTweet.bind(this);
        this.followUser = this.followUser.bind(this);
      }

  componentDidMount() {
    this.getFeeds(1);
  }

  getFeeds(pagenumber) {
    this.props.actions.getBookmarks(1, pagenumber, (status, feeds) => {
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

  updateLikeCount = e => {
    const tweetId = e.currentTarget.getAttribute("data-tweetId");
    const likeCount = e.currentTarget.getAttribute("data-count");
    var tweetData = this.props.feeds.feeds.docs.filter(function( obj ) {
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
    return (
        <div class="col-md-5 border bg-dark text-white">
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
                    <div class="col-md-2">
                        <div class="mt-2 twitter-avatar">
                            <img src={this.getImage(value.images[0])} class="rounded-circle" />
                        </div>
                    </div>
                    <div class="col-md-10">
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
                                <div class="col-md-3">
                                    <i class="far fa-comment" data-tweetId={value.tweetId} data-count={value.replyCount} onClick={this.replyToTweet}></i>
                                    <span class="comment-count ml-1">{value.num_comments}</span>
                                </div>
                                <div class="col-md-3">
                                    <i class="fas fa-retweet" data-tweetId={value.tweetId} data-count={value.reTweetCount} onClick={this.reTweet}></i>
                                    <span class="retweet-count ml-1">{value.reTweetCount}</span>
                                </div>
                                <div class="col-md-3">
                                    <i class="far fa-heart" data-tweetId={value.tweetId} data-count={value.likeCount} onClick={this.updateLikeCount}></i>
                                    <span class="like-count ml-1">{value.likeCount}</span>
                                </div>
                                <div class="col-md-3">
                                    <i class="far fa-share-square"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                );
            })}
            </InfiniteScroll>
            <div class="row border-bottom-1 border-dark-gray mt-2">
                    <div class="col-md-2">
                        <div class="mt-2 twitter-avatar">
                            <img src="https://pbs.twimg.com/profile_images/1145812709960667136/YF4VoP3e_400x400.jpg" class="rounded-circle" />
                        </div>
                    </div>
                    <div class="col-md-10">
                        <div class="row d-inline-block w-100">
                            <div class="twitter-name d-inline-block">KPIX 5</div>
                            <div class="twitter-tick ml-1 d-inline-block">
                                <div dir="auto" class="css-901oao r-jwli3a r-18u37iz r-1q142lx r-1qd0xha r-a023e6 r-16dba41 r-ad9z0x r-bcqeeo r-qvutc0"><svg viewBox="0 0 24 24" aria-label="Verified account" class="r-jwli3a r-4qtqp9 r-yyyyoo r-1xvli5t r-9cviqr r-dnmrzs r-bnwqim r-1plcrui r-lrvibr">
                                        <g>
                                            <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"></path>
                                        </g>
                                    </svg></div>
                            </div>
                            <div class="twitter-handle ml-2 d-inline-block">@KPIXtv</div>
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
                                    <a class="dropdown-item" href="#">
                                        <i class="fas fa-user-plus"></i>
                                        <span class="ml-2 mt-2">Follow @Kimkardashian</span>                                  
                                    </a>
                                    <a class="dropdown-item" href="#">
                                        <i class="fas fa-volume-mute"></i>
                                        <span class="ml-2 mt-2">Mute @Kimkardashian</span>
                                    </a>
                                    <a class="dropdown-item" href="#">
                                        <i class="fas fa-ban"></i>
                                        <span class="ml-2 mt-2">Block @Kimkardashian</span>  
                                    </a>
                                    <a class="dropdown-item" href="#">
                                        <i class="far fa-flag"></i>
                                        <span class="ml-2 mt-2">Report Tweet</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
                        <div class="row mt-2 tweet-images">
                            <img src="https://pbs.twimg.com/media/EKANg0GXkAAgvuv?format=jpg&name=medium" class="rounded" />
                        </div>
                        <div class="row d-inline-block w-100 mt-3 mb-2">
                            <div class="row">
                                <div class="col-md-3">
                                    <i class="far fa-comment"></i>
                                    <span class="comment-count ml-1">7</span>
                                </div>
                                <div class="col-md-3">
                                    <i class="fas fa-retweet"></i>
                                    <span class="retweet-count ml-1">2</span>
                                </div>
                                <div class="col-md-3">
                                    <i class="far fa-heart"></i>
                                    <span class="like-count ml-1">12</span>
                                </div>
                                <div class="col-md-3">
                                    <i class="far fa-share-square"></i>
                                </div>
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
        getBookmarks: bindActionCreators(bookmarkActions.getBookmarks, dispatch),
        blockFollowing: bindActionCreators(feedActions.blockFollowing, dispatch),
        muteFollowing: bindActionCreators(feedActions.muteFollowing, dispatch),
        likeTweet: bindActionCreators(feedActions.likeTweet, dispatch),
        unlikeTweet: bindActionCreators(feedActions.unlikeTweet, dispatch),
        reTweet: bindActionCreators(feedActions.reTweet, dispatch),
        replyToTweet: bindActionCreators(feedActions.replyToTweet, dispatch)
      }
    };
  }

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(BookmarkComponent);



