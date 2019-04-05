const pool = require('../config/db.js');

module.exports = {
  async getTask(req, res) {
    try {
      if (req.decoded.role_id !== 3) {
        const result = await pool.query(`SELECT * FROM orders o
          INNER JOIN activity_track at ON o.order_id = at.order_id
          INNER JOIN activity a ON a.activity_id = at.activity_id
          WHERE a.role_id = ${parseInt(req.params.roleId)} AND (open_status = 1 OR open_status = 4)`);
        res.json(result);
      } else {
        const result = await pool.query(`SELECT * FROM orders o
          INNER JOIN activity_track at ON o.order_id = at.order_id
          INNER JOIN activity a ON a.activity_id = at.activity_id
          INNER JOIN order_vendor_history ov ON ov.order_id = o.order_id
          WHERE a.role_id = ${parseInt(req.params.roleId)} AND open_status = 1 AND ov.vendor_id = ${req.decoded.user_id}
          AND ov.replaced = 0`);
        res.json(result);
      }
    } catch (error) {
      console.log(error);
      res.json({
        success: false, 
        result: 'something gone wrong'
      });
    }
  },
  async TaskCounter(req, res) {
    try {
      if (req.decoded.role_id !== 3) {
        const result = await pool.query(`SELECT COUNT(*) AS task_count FROM orders o
          INNER JOIN activity_track at ON o.order_id = at.order_id
          INNER JOIN activity a ON a.activity_id = at.activity_id
          WHERE a.role_id = ${parseInt(req.params.roleId)} AND (open_status = 1 OR open_status = 4)`);
        res.json(result);
      } else {
        const result = await pool.query(`SELECT COUNT(*) AS task_count FROM orders o
          INNER JOIN activity_track at ON o.order_id = at.order_id
          INNER JOIN activity a ON a.activity_id = at.activity_id
          INNER JOIN order_vendor_history ov ON ov.order_id = o.order_id
          WHERE a.role_id = ${parseInt(req.params.roleId)} AND open_status = 1 AND ov.vendor_id = ${req.decoded.user_id}
          AND ov.replaced = 0`);
        res.json(result);
      }
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        result: 'something gone wrong'
      });
    }
  }
}