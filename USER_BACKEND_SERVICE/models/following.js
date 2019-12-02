const mongoose = require('mongoose')
const config = require('../config/settings');

var connection;
if (true) {
    connection = mongoose.createConnection(config.saidatabase, {
    useNewUrlParser: true,
    server: { poolSize: 100 }
    });

    connection.on("connected", () => {
    console.log("sai following connection connected");
    });

    connection.on("disconnected", () => {
    console.log("sai following connection disconnected");
    });
}

const followingSchema = new mongoose.Schema({
	userId: {
		type: Number,
        required: true
    },
    follows: {
		type: Array,
        required: true
    },
	followingCount: {
		type: Number,
        required: true
    }
});

var exported;
if (true) {
    exported = connection.model("Following", followingSchema);
} 
module.exports = exported;