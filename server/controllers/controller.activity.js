const pool = require('../config/db.js');

module.exports = {

  async createNewActivity(req, res) {
    try {
      const result = await pool.query(`INSERT INTO activity
        (activity_name, activity_description, role_id, require_status, 
        require_information, require_attachment, can_close, can_choose_vendor, max_duration, can_cancel) VALUES
        ('${req.body.activity_name}', '${req.body.activity_description}', ${req.body.role_id}, ${req.body.require_status}, 
        ${req.body.require_information}, ${req.body.require_attachment}, ${req.body.can_close}, ${req.body.can_choose_vendor})
        ${req.body.max_duration}, ${req.body.can_cancel}, ${req.body.can_finish}`);
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

  }, 

  async updateActivity(req, res) {
    try {
      console.log(req.body);
      const result = pool.query(`UPDATE activity SET activity_name = '${req.body.activity_name}', activity_description = '${req.body.activity_description}',
        role_id = ${req.body.role_id}, require_status = ${req.body.require_status}, require_information = ${req.body.require_information}, 
        require_attachment = ${req.body.require_attachment}, can_close = ${req.body.can_close}, can_choose_vendor = ${req.body.can_choose_vendor},
        max_duration = ${parseInt(req.body.max_duration)}, can_cancel = ${req.body.can_cancel}, can_finish = ${req.body.can_finish}
        WHERE activity_id = ${req.body.activity_id}`);
      res.json({
        success: true, 
        result: result
      });
    } catch (error) {
      console.log(error);
      res.json({
        success: false, 
        result: 'something gone wrong',
      })
    }
  }

}