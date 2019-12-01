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


const followerSchema = new mongoose.Schema({
	userId: {
		type: Number,
        required: true
    },
    followers: {
		type: Array,
        required: true
    },
	followersCount: {
		type: Number,
        required: true
    }
});

var exported;
if (appConfig.useConnectionPooling) {
    exported = connection.model("Follower", followerSchema);
} else {
    exported = mongoose.model( 'Follower', followerSchema );
}
module.exports = exported;