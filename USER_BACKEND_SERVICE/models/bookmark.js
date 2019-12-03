const mongoose = require('mongoose')
const config = require('../config/settings');

var connection;
if (true) {
    connection = mongoose.createConnection(config.saidatabase, {
    useNewUrlParser: true,
    server: { poolSize: 100 }
    });

    connection.on("connected", () => {
    console.log("jing connection connected");
    });

    connection.on("disconnected", () => {
    console.log("jing connection disconnected");
    });
}


const BookmarkSchema = new mongoose.Schema({
	userId: {
		type: Number,
        required: true
    },
    tweetId:
    {
     type: Array,
     required:true
    }
   
});

var exported;
if (true) {
    exported = connection.model("bookmark", BookmarkSchema);
} 
module.exports = exported;



