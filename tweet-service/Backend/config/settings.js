'use strict';
module.exports = {
    'secret': "Passphrase for encryption should be 45-50 char long",
    'mongodb': 'mongodb://localhost:27017',
    'dbname' : 'LOCAL_DB_NAME',
    'dbsetting': { useNewUrlParser: true, poolSize: 10 },
    'redisSetting': 'off',
    'kafka_address': "localhost:2181"
};