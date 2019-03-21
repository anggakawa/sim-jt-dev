const pool = require('../config/db.js');

module.exports = {
  
  async getMitraOrderList(req, res) {
    try {
      const result = await pool.query(`SELECT * FROM orders o RIGHT JOIN order_vendor_history ov
      ON ov.order_id = o.order_id INNER JOIN users u ON u.user_id = ov.vendor_id`);
      res.json(result);
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        result: 'something gone wrong',
      });
    }
  },

  async getMitraTimeline(req, res) {
    try {
      const result = await pool.query(`SELECT o.order_id, 
        u.username, u.user_id, u.user_description, o.date, a.activity_name, a.activity_description,
        i.open_status, a.activity_id 
      FROM order_logs o INNER JOIN users u ON u.user_id = o.user_id
        INNER JOIN activity a ON a.activity_id = o.activity_id 
        INNER JOIN orders i ON i.order_id = i.order_id
        WHERE u.role_id = 3 AND (i.open_status = 2 OR i.open_status = 3)`);
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