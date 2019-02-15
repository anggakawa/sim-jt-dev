const pool = require('../config/db.js');

module.exports = {
  async getTask(req, res) {
    try {
      const result = await pool.query(`SELECT * FROM orders o
        INNER JOIN activity_track at ON o.order_id = at.order_id
        INNER JOIN activity a ON a.activity_id = at.activity_id
        WHERE a.role_id = ${parseInt(req.params.roleId)}`);
      res.json(result);
    } catch (error) {
      console.log(error);
      res.json({
        success: false, 
        result: 'something gone wrong'
      });
    }
  }
}