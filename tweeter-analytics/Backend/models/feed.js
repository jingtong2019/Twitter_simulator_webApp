const mongoose = require('mongoose')

const feedSchema = new mongoose.Schema({
	
	retweetCount: {
		type: Number,
        required: true
    },
    commentCount: {
		type: Number,
        required: true
    },
	likeCount: {
		type: Number,
        required: true
    },
    tweetImages: {
        type: Array,
        required: true
    },
    textContent: {
        type: String,
        required: true
    },
    userHandle: {
        type: String,
        required: true
    },
    userAvatar: {
        type: String,
        required: true
    },
    tweetTime: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model( 'Feed', feedSchema )