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

const likeSchema = new mongoose.Schema({
	userId: {
		type: Number,
        required: true
    },
    likedBy: {
		type: Array,
        required: true
    },
	likeCount: {
		type: Number,
        required: true
    }
});

var exported;
if (appConfig.useConnectionPooling) {
    exported = connection.model("Like", likeSchema);
} else {
    exported = mongoose.model( 'Like', likeSchema );
}
module.exports = exported;