'use strict';
module.exports = {
    'secret': "Passphrase for encryption should be 45-50 char long",
    'mongodb': 'mongodb://localhost:27017',
    'dbname' : 'LOCAL_DB_NAME',
    'mongodb2': 'mongodb://user1:user1password@ec2-52-53-158-214.us-west-1.compute.amazonaws.com:27017/mydb',
    'dbsetting': { useNewUrlParser: true, poolSize: 10 },
    'redisSetting': 'off',
    'kafka_address': "localhost:2181"
};