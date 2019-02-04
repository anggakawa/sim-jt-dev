const pool = require('../config/db.js');

module.exports = {

  async selectAllRoles(req, res) {
    try {
      const result = await pool.query(`SELECT * FROM roles`);
      return res.json({
        result
      });
    } catch (error) {
      console.log(error);
      res.json({
        success: false, 
        result: 'something gone wrong',
      });
    }
  }

}