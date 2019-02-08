const pool = require('../config/db.js');

module.exports = {

  async getAllOrderHistory(req, res) {
    try {
      const result = await pool.query(`SELECT * FROM order_logs`);
      res.json(result);
    } catch (error) {
      console.log(error);
      return res.json({
        success: false, 
        result: 'something gone wrong',
      })
    }
  }, 

  async createNewOrderLog(req, res) {
    try {
      const result = await pool.query(`INSERT INTO order_logs
        (order_id, activity_id, information, status, date, user_id)
        VALUES ('${req.body.order_id}', ${req.body.activity_id}, '${req.body.information}',
        ${req.body.status}, '${req.body.date}', ${req.body.user_id})`);
      res.json(result);  
    } catch (error) {
      console.log(error);
      res.json({
        success: false, 
        result: 'something gone wrong',
      });
    }
  }

}