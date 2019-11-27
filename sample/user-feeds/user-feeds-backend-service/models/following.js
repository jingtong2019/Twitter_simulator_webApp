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
if (appConfig.useConnectionPooling) {
    exported = connection.model("Following", followingSchema);
} else {
    exported = mongoose.model( 'Following', followingSchema );
}
module.exports = exported;