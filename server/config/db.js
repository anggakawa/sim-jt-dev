const mysqsl = require('mysql');
const util = require('util');
const option = {
  connectionlimit: 10,
  host: 'localhost', 
  port: 3306, 
  user: 'root', 
  password: '', 
  database: 'sim-jt'
};

const pool = mysqsl.createPool(option);
pool.getConnection((err, conn) => {
  if (err){
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('DATABASE HAS TOO MANY CONNECTIONS.');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.');
    }
  }
  if (conn) conn.release();
  return;
});

pool.query = util.promisify(pool.query);

module.exports = pool;
