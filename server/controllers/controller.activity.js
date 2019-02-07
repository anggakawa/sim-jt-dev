const pool = require('../config/db.js');

module.exports = {

  async createNewActivity(req, res) {
    try {
      const result = await pool.query(`INSERT INTO activity
        (activity_name, activity_description, role_id, require_status, 
        require_information, require_attachment, can_close, can_choose_vendor) VALUES
        ('${req.body.activity_name}', '${req.body.activity_description}', ${req.body.role_id}, ${req.body.require_status}, 
        ${req.body.require_information}, ${req.body.require_attachment}, ${req.body.can_close}, ${req.body.can_choose_vendor})`);
      return res.json({
        success: true, 
        results: result
      });  
    } catch (error) {
      console.log(error);
      return res.json({
        success: false, 
        result: 'something gone wrong'
      });
    }
  }, 

  async getActivityById(req, res) {
    try {
      const result = await pool.query(`SELECT * FROM activity WHERE activity_id = ${req.params.activityId}`);
      res.json({
        result
      });
    } catch (error) {
      console.log(error);
      res.json({
        success: false, 
        result: 'something gone wrong'
      });
    }
  }, 

  async getAllActivity(req, res) {
    try {
      const result = await pool.query(`SELECT * FROM activity INNER JOIN roles ON activity.role_id = roles.role_id`);
      res.json(result);
    } catch (error) {
      console.log(error);
      res.json({
        success: false, 
        result: 'something gone wrong'
      });
    }
  }, 

  async deleteActivity(req, res) {
    try {
      const result = pool.query(`DELETE FROM activity WHERE activity_id = '${req.params.activityId}'`);
      res.json({
        success: true, 
        results: result
      })
    } catch (error) {
      console.log(error);
      res.json({
        success: false, 
        result: 'something gone wrong'
      })
    }

  }

}