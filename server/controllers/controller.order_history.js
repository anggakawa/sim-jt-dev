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
      });
    }
  }, 

  async getAllOrderHistoryPerId(req, res) {
    try {
      const result = await pool.query(`SELECT * FROM order_logs 
        INNER JOIN users ON order_logs.user_id = users.user_id 
        INNER JOIN activity ON order_logs.activity_id = activity.activity_id
        LEFT JOIN order_attachment ON order_logs.order_logs_id = order_attachment.order_logs_id 
        WHERE order_id = '${req.params.orderId}'`);
      res.json(result);
    } catch (error) {
      console.log(error);
      return res.json({
        success: false, 
        result: 'something gone wrong',
      });
    }
  },

  async createNewOrderLog(req, res) {
    try {
      const result = await pool.query(`INSERT INTO order_logs
        (order_id, activity_id, information, status, date, user_id)
        VALUES ('${req.body.order_id}', ${req.body.activity_id}, '${req.body.information}',
        ${req.body.status}, NOW(), ${req.decoded.user_id})`);
      res.json(result);  
    } catch (error) {
      console.log(error);
      res.json({
        success: false, 
        result: 'something gone wrong',
      });
    }
  },

  async createNewOrderlogBlank(req, res) {
    try {
      const result = await pool.query(`INSERT INTO order_logs
        (order_id, activity_id, date)
        VALUES ('${req.body.order_id}', ${req.body.activity_id}, NOW())`);
      res.json(result);
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        result: 'something gone wrong',
      });
    }
  },

  async deleteOrderLog(req, res) {
    try {
      const result = await pool.query(`DELETE FROM order_logs 
        WHERE order_logs_id = ${req.params.orderLogId}`);
      res.json({
        success: true, 
        result : result,
      });
    } catch (error) {
      console.log(error);
      res.json({
        success: false, 
        result: 'something gone wrong',
      })
    }
  },

  async updateOrderLogInformation(req, res) {
    try {
      const result = await pool.query(`UPDATE order_logs SET information = '${req.body.information}', 
        status = ${req.body.status}, date = NOW(), user_id = ${req.decoded.user_id} WHERE order_logs_id = ${req.body.order_logs_id}`);
      res.json({
        success: true, 
        result: result
      });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        result: 'something gone wrong',
      });
    }
  },

  async getOrderLogDate(req, res) {
    try {
      const result = await pool.query(`SELECT MAX(date) AS date FROM order_logs WHERE order_id = '${req.params.orderId}'`);
      res.json(result);
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        result: 'something gone wrong',
      });
    }
  },

}