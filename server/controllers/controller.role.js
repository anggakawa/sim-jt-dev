const pool = require('../config/db.js');

module.exports = {

  async selectAllRoles(req, res) {
    try {
      const result = await pool.query(`SELECT * FROM roles`);
      return res.json(result);
    } catch (error) {
      console.log(error);
      res.json({
        success: false, 
        result: 'something gone wrong',
      });
    }
  }, 

  async createNewRole(req, res) {
    try {
      const result = await pool.query(`INSERT INTO roles (role_name) VALUES ('${req.body.role_name}')`);
      return res.json({
        success: true, 
        result: result,
      });
    } catch (error) {
      console.log(error);
      res.json({
        success: false, 
        result: 'something gone wrong',
      });
    }
  },

  async deleteRole(req, res) {
    try {
      const result = await pool.query(`DELETE FROM roles WHERE role_id = ${req.params.roleId}`);
      res.json({
        success: true, 
        result: result,
      });
    } catch (error) {
      console.log(error);
      res.json({
        success: false, 
        result: 'something gone wrong'
      });
    }
  }

}