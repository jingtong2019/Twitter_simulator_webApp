const mongoose = require('mongoose')
const appConfig = require('../config/main');

var connection;
if (appConfig.useConnectionPooling) {
    connection = mongoose.createConnection(appConfig.tweetDatabase, {
    useNewUrlParser: true,
    server: { poolSize: 100 }
    });

    connection.on("connected", () => {
    console.log("connection connected");
    });

    connection.on("disconnected", () => {
    console.log("connection disconnected");
    });
}

const tweetSchema = new mongoose.Schema({
	by: {
		type: Number,
        required: true
    },
    content: {
		type: String,
        required: true
    },
	images: {
		type: Array,
        required: true
    },
    UserName: {
		type: String,
        required: true
    },
    UserHandle: {
		type: Array,
        required: true
    },
    hashtags: {
		type: Array,
        required: true
    },
    likes: {
		type: Array,
        required: true
    },
    num_likes: {
		type: Number,
        required: true
    },
    retweets: {
		type: Number,
        required: true
    },
    num_comments: {
		type: Number,
        required: true
    },
    views: {
		type: Number,
        required: true
    },
    tweet_type: {
		type: String,
        required: true
    },
    retweet_from: {
		type: Array,
        required: true
    },
    date: {
		type: Date,
        required: true
    }
});

var exported;
if (appConfig.useConnectionPooling) {
    exported = connection.model("Tweet", tweetSchema, "tweet");
} else {
    exported = mongoose.model( 'Tweet', tweetSchema, "tweet" );
}
module.exports = exported;