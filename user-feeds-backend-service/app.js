const express = require('express')
const app = express()
const morgan = require('morgan') // logger
const appConfig = require('./config/main');
const kafkaConfig = require('./kafka/config');
var kafka = require('kafka-node');
const consumer = require('./kafka/consumer')
const mongoose = require('mongoose')

const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
server.use(middlewares)

server.get('/echo', (req, res) => {
	res.jsonp(req.query)
  })

server.use(jsonServer.bodyParser);
server.use(router);
server.listen(3001, () => {
	console.log('Mock Server is running')
  });

app.set('port', (process.env.PORT || 4020))

app.use(express.static('static'))

app.use(morgan('dev'))

app.use(function (req, res) {
	const err = new Error('Not Found')
	err.status = 404
	res.json(err)
});

//  MongoDB connection 
if (!appConfig.useConnectionPooling) {
	mongoose.connect(appConfig.database, { useNewUrlParser: true })
	const db = mongoose.connection
	db.on('error', console.error.bind(console, 'connection error:'))
	db.once('open', function () {
		console.log('Connected to MongoDB')
		app.listen(app.get('port'), function () {
			console.log('API Server Listening on port ' + app.get('port') + '!')
		});
	});
} else {
	app.listen(app.get('port'), function () {
		console.log('API Server Listening on port ' + app.get('port') + '!')
	});
}

mongoose.connect("mongodb://user1:user1password@ec2-52-53-158-214.us-west-1.compute.amazonaws.com:27017/mydb", function(err, db) {
	console.log("123");
});

// async function initKafkaAndStartApp() {
// 	var client = new kafka.KafkaClient(kafkaConfig.kafka_server);
// 	var topics = appConfig.topics.split(',');
// 	for (var topic of topics) {
// 		await createTopicsIfNotExists(topic, client);
// 	}
// 	app.listen(app.get('port'), function () {
// 		console.log('API Server Listening on port ' + app.get('port') + '!')
// 	})
// }

// async function createTopicsIfNotExists(topic, client) {
// 	return new Promise((resolve, reject) => {
// 		client.loadMetadataForTopics([topic], (err, resp) => {
// 			console.log(JSON.stringify(resp));
// 			if (err) {
// 				console.log("unknown error occurred. Exiting.")
// 				process.exit();
// 			} else {
// 				// create topic
// 			}
// 			resolve();
// 		  });
// 	})
// }