const Follower = require('../models/follower');
const Following = require('../models/following');
const ProfileView = require('../models/profileView');
const tweetApi = require('../api/tweetApi');
const appConfig = require('../config/main');
const TweetTest = require('../models/tweet_test');
const Comment = require('../models/comment');
const redis = require('redis')

const client = redis.createClient(6379)

client.on('error', (err) => {
    console.log("Error " + err)
});

module.exports = {
    getUserFeeds:function(userId, pageNumber, callback) {
		const redisKey = 'getUserFeeds:' + userId;
		pageNumber = parseInt(pageNumber);
		tweetApi.getUserTweets_jing(parseInt(userId)).then(resp => {
			var res = [];
				let tweetIds = resp.data.result.map(doc => doc._id);
				var qry = {
					tweetId: { $in: tweetIds }
				}
				Comment.find(qry)
					.exec()
					.then(coms => {
						resp.data.result.forEach((d, index) => {
							if (index >= (pageNumber - 1) * 5 && index < 5 * pageNumber) {
								var tweetObj = {};
								tweetObj["_id"] = d._id;
								tweetObj["content"] = d.content;
								tweetObj["userName"] = d.UserName;
								tweetObj["by"] = d.by;
								tweetObj["twitterHandle"] = d.UserHandle;
								tweetObj["images"] = d.images;
								tweetObj["hashtags"] = d.hashtags;
								tweetObj["likes"] = d.likes;
								tweetObj["likeCount"] = d.num_likes;
								tweetObj["reTweetCount"] = d.retweets;
								tweetObj["tweet_type"] = d.tweet_type;
								tweetObj["date"] = d.date;
								var comms = getTweetComments(coms, d._id);
								tweetObj["comments"] = comms;
								tweetObj["num_comments"] = comms.length;
								res.push(tweetObj);
							}
						});
						var result = {};
						result.docs = res;
						if ((pageNumber + 1) * 5 < resp.data.result.length)
							result.hasMore = true;
						else
							result.hasMore = false;
						callback(null, result);
					})
					.catch(err => {
						callback(err, null);
					})
		}).catch(err => {
			callback(err, null);
		});
	},
	getUserFeeds1:function(userId, pageNumber, callback) {
		const qry = {
            by: { $gt: 0 }
		}
		pageNumber = parseInt(pageNumber);
		TweetTest.find(qry)
			.exec()
			.then(docs => {
				var res = [];
				let tweetIds = docs.map(doc => doc._id);
				var qry = {
					tweetId: { $in: tweetIds }
				}
				Comment.find(qry)
					.exec()
					.then(coms => {
						docs.forEach((d, index) => {
							if (index >= (pageNumber - 1) * 5 && index < 5 * pageNumber) {
								var tweetObj = {};
								tweetObj["_id"] = d._id;
								tweetObj["content"] = d.content;
								tweetObj["userName"] = d.UserName;
								tweetObj["by"] = d.by;
								tweetObj["twitterHandle"] = d.UserHandle;
								tweetObj["images"] = d.images;
								tweetObj["hashtags"] = d.hashtags;
								tweetObj["likes"] = d.likes;
								tweetObj["likeCount"] = d.num_likes;
								tweetObj["reTweetCount"] = d.retweets;
								tweetObj["num_comments"] = d.num_comments;
								tweetObj["tweet_type"] = d.tweet_type;
								tweetObj["date"] = d.date;
								tweetObj["comments"] = getTweetComments(coms, d._id);
								res.push(tweetObj);
							}
						});
						var result = {};
						result.docs = res;
						if ((pageNumber + 1) * 5 < docs.length)
							result.hasMore = true;
						else
							result.hasMore = false;
						callback(null, result);
					})
					.catch(err => {
						callback(err, null);
					})
            })
            .catch(err => {
                console.log(err, null);
            })
	},
	updateUserFollowers: function(userId, followerUserId, callback) {
		userId = parseInt(userId);
		followerUserId = parseInt(followerUserId);

		const qry = {
            userId: { $eq: userId }
		}
		Follower.findOne(qry)
			.exec()
			.then(docs => {
				if (!docs) {
					var follower = new Follower({
						userId: userId,
						followers: [{
							userId: followerUserId,
							followedDate: Date.now()
						}],
						followersCount: 1
					});
					follower.save(function(err, docs) {
						if (err) callback(err, null);
						else callback(null, docs);
					});
				} else {
					const qry2 = {
						userId: { $eq: userId }
					}
					let followers = docs.followers;
					followers.push({userId: followerUserId, followedDate: Date.now()});
					Follower.findOneAndUpdate(qry2, {$set: {followers: followers, followersCount: docs.followersCount + 1}}, {new: true}, function(err, docs) {
						if (err) {
							callback(err, null);
						} else {
							callback(null, docs);
						}
					});
				}
				callback(null, docs);
			})
			.catch(err => {
                callback(err, null);
		    });
	},
	getUserFollowers: function(userId, callback) {
		const redisKey = 'getUserFollowers:' + userId;
		return client.get(redisKey, (err, followers) => {
			if (followers && appConfig.useRedisCache) {
				callback(null, JSON.parse(followers));
			} else {
				const qry = {
					userId: { $eq: userId }
				}
				Follower.find(qry)
					.exec()
					.then(docs => {
						client.setex(redisKey, 3600, JSON.stringify(docs[0]));
						callback(null, docs[0]);
					})
					.catch(err => {
						callback(err, null);
					});
			}
		});
	},
	getUsersFollowing: function(userId, callback) {
		const redisKey = 'getUsersFollowing:' + userId;
		return client.get(redisKey, (err, follows) => {
			if (follows && appConfig.useRedisCache) {
				callback(null, JSON.parse(follows));
			} else {
				const qry = {
					userId: { $eq: userId }
				}
				Following.find(qry)
					.exec()
					.then(docs => {
						client.setex(redisKey, 3600, JSON.stringify(docs[0]));
						callback(null, docs[0]);
					})
					.catch(err => {
						callback(err, null);
					});
			}
		});
	},
	getProfileViews2: function(userId, duration, callback) {
		const redisKey = 'getProfileViews:' + userId + ":" + duration;
		return client.get(redisKey, (err, profileViews) => {
			if (profileViews && appConfig.useRedisCache) {
				callback(null, parseInt(profileViews));
			} else {
				var start = new Date();
				start.setHours(0,0,0,0);
				var end = new Date();
				end.setHours(0,0,0,0);
				end.setDate(end.getDate() - duration);
				const qry = {
					userId: userId,
					ts: {
						$gt:  end,
        				$lte:  start
					}
				}
				ProfileView.find(qry)
					.exec()
					.then(docs => {
						var totalViews = 0;
						for (var doc of docs) {
							totalViews += doc.views;
						}
						client.setex(redisKey, 3600, totalViews);
						callback(null, totalViews);
					})
					.catch(err => {
						callback(err, null);
					})
			}
		});
	},
	getProfileViews: function(userId, duration, callback) {
		var start = new Date();
				start.setHours(0,0,0,0);
				var end = new Date();
				end.setHours(0,0,0,0);
				end.setDate(end.getDate() - duration);
				const qry = {
					userId: userId,
					ts: {
						$gt:  end,
        				$lte:  start
					}
				}
		ProfileView.find(qry)
			.exec()
			.then(docs => {
				callback(null, docs);
			})
			.catch(err => {
				callback(err, null);
			})
	},
	updateProfileViews: function(userId, callback) {
		var today = new Date();
		today.setHours(0,0,0,0);
		var query = {
			userId: userId,
			ts: today
		},
			update = { $inc: {views: 1} },
			options = { upsert: true, new: true, setDefaultsOnInsert: true };
			ProfileView.findOneAndUpdate(query, update, options, function(err, doc) {
				if (err) {
					callback(err, null);
				} else {
					callback(null, doc);
				}
			});
	}
};

function generateFakeFollowerData() {
	var tenKfollowers = [];
	for (var i = 1; i <= 10000; i++) {
		var num_followers = Math.floor(Math.random() * 20) + 1;
		var followers = [];
		var temp = [];
		for (var j = 0; j < num_followers; j++) {
			var rand_follower_id = Math.floor(Math.random() * 10000) + 1;
			if (temp.indexOf(rand_follower_id) === -1) {
				followers.push({userId: rand_follower_id, followedDate: Date.now() - Math.floor(Math.random() * 100) + 1});
				temp.push(rand_follower_id);
			} else {
				j--;
			}
		}
		let follower = new Follower({
			userId: i,
			followersCount: num_followers,
			followers: followers
		});
		tenKfollowers.push(follower);
	}

	Follower.collection.insert(tenKfollowers, function(err, docs) {
		if (err) {
			console.log('error in inserting bublk data');
		} else {
			console.log('success');
		}
	})
}

function generateFakeFollowingData() {
	var tenKfollowing = [];
	for (var i = 1; i <= 10000; i++) {
		var num_following = Math.floor(Math.random() * 20) + 1;
		var follows = [];
		var temp = [];
		for (var j = 0; j < num_following; j++) {
			var rand_following_id = Math.floor(Math.random() * 10000) + 1;
			if (temp.indexOf(rand_following_id) === -1) {
				follows.push({userId: rand_following_id, followedDate: Date.now() - Math.floor(Math.random() * 100) + 1});
				temp.push(rand_following_id);
			} else {
				j--;
			}
		}
		let following = new Following({
			userId: i,
			followingCount: num_following,
			follows: follows
		});
		tenKfollowing.push(following);
	}

	Following.collection.insert(tenKfollowing, function(err, docs) {
		if (err) {
			console.log('error in inserting bublk data');
		} else {
			console.log('success');
		}
	})
}

function generateFakeProfileViewsData() {
	var tenKProfileViews = [];
	for (var i = 1; i <= 10000; i++) {
		var start = new Date();
		start.setHours(0,0,0,0);
		var monthFromNow = start.getTime() + 864000000;
		for (var j = 0; j < 30; j++) {
			var profileView = new ProfileView({
				userId: i,
				views: Math.floor(Math.random() * 2000) + 1,
				ts: monthFromNow - j * 86400000
			});
			tenKProfileViews.push(profileView);
		}
	}
	ProfileView.collection.insert(tenKProfileViews, function(err, docs) {
		if (err) {
			console.log('error in inserting bulk data');
		} else {
			console.log('success');
		}
	})
}

function getTweetComments(comments, tweetId) {
	comments = JSON.parse(JSON.stringify(comments));
	res = [];
	comments.forEach(com => {
		if (com.tweetId === tweetId.toString())
			res.push(com);
	});
	return res;
}