let mysql = require('promise-mysql');

module.exports = async () => {
    try {
        let connection = await mysql.createConnection({
            host: 'twitter.c4nbsf9ejoyh.us-east-1.rds.amazonaws.com',
            user: 'admin',
            password: 'password123',
            database: "Twitter"
        });
      return connection;
    } catch (ex) {
        throw ex;
    }
}