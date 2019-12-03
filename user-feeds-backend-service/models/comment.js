const mongoose = require('mongoose')
const appConfig = require('../config/main');

var connection;
if (appConfig.useConnectionPooling) {
    connection = mongoose.createConnection(appConfig.database, {
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


const commentSchema = new mongoose.Schema({
	userId: {
		type: Number,
        required: true
    },
    userImage: {
		type: String,
        required: true
    },
    tweetId: {
		type: String,
        required: true
    },
	content: {
		type: String,
        required: true
    },
    likeCount: {
		type: Number,
        required: true
    },
    likes: {
		type: Array,
        required: false
    }
});

var exported;
if (appConfig.useConnectionPooling) {
    exported = connection.model("Comment", commentSchema, "comments");
} else {
    exported = mongoose.model( 'Comment', commentSchema, "comments" );
}
module.exports = exported;