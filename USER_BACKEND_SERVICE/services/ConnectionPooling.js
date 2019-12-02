let mysql = require('promise-mysql');

module.exports = async () => {
    try {
        let pool = mysql.createPool({
            connectionLimit: 20,
            host: 'database-1.cakh22qnfhuh.us-east-2.rds.amazonaws.com',
            user: 'admin',
            password: 'admin123',
            database: "Twitter"
        });
        if (pool) 
        {
        let con = pool.getConnection();
        console.log("connected to mysql");
        return con;
        }
    } catch (ex) {
        throw ex;
    }
}