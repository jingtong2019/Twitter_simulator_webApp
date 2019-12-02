const mongoose = require('mongoose')
const config = require('../config/settings');

var connection;
if (true) {
    connection = mongoose.createConnection(config.saidatabase, {
    useNewUrlParser: true,
    server: { poolSize: 100 }
    });

    connection.on("connected", () => {
    console.log("sai follower connection connected");
    });

    connection.on("disconnected", () => {
    console.log("sai follower connection disconnected");
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
if (true) {
    exported = connection.model("Follower", followerSchema);
} 
module.exports = exported;