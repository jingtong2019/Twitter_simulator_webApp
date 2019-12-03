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

const profileViewSchema = new mongoose.Schema({
	userId: {
		type: Number,
        required: true
    },
    views: {
		type: Number,
        required: true
    },
	ts: {
		type: Date,
        required: true
    }
});

var exported;
if (appConfig.useConnectionPooling) {
    exported = connection.model("ProfileView", profileViewSchema);
} else {
    exported = mongoose.model( 'ProfileView', profileViewSchema );
}
module.exports = exported;