'use strict';
module.exports = {
    'secret': "Passphrase for encryption should be 45-50 char long",
    'mongodb': 'mongodb://localhost:27017',
    'dbname' : 'LOCAL_DB_NAME',
    'mongodb1': 'mongodb://localhost:27017/LOCAL_DB_NAME',
    'mongodb2': 'mongodb://user1:user1password@ec2-52-53-158-214.us-west-1.compute.amazonaws.com:27017/mydb',
    'mongodb3': 'mongodb+srv://saitwitter:saitwitter@saiprithipa-cluster-fz95b.mongodb.net',
    'dbname3': 'saitwitter',
    'dbsetting': { useNewUrlParser: true, poolSize: 10 },
    'redisSetting': 'on',
    'kafka_address': "localhost:2181"
};