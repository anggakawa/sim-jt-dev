const pool = require('../config/db.js');

module.exports = {

  async getAllActivityOptions(req, res) {
    try {
      const result = await pool.query(`SELECT * FROM activity_options`);
      return res.json(result);
    } catch (error) {
      console.log(error);
      res.json({
        success: false, 
        result: 'something gone wrong',
      });
    }
  }, 

  async createActivityOption(req, res) {
    try {
      const result = await pool.query(`INSERT INTO activity_options
        (activity_id, option_text, option_value, value_description) VALUES
        (${req.body.activity_id}, '${req.body.option_text}', ${req.body.option_value}, 
        '${req.body.value_description}')`);
      res.json({
        success: true, 
        result: result,
      });  
    } catch (error) {
      console.log(error);
      return res.json({
        success: false, 
        result: 'something gone wrong',
      });
    }
  }, 

  async getActivityOptionsById(req, res) {
    try {
      const result = await pool.query(`SELECT * FROM activity_options WHERE activity_id = ${req.params.activityId}`);
      res.json(result);
    } catch (error) {
      console.log(error);
      res.json({
        success: false, 
        result: 'something gone wrong',
      });
    }
  }, 

  async deleteActivity(req, res) {
    try {
      const result = pool.query(`DELETE FROM activity_options WHERE activity_options_id = ${req.params.activityOptId}`);
      res.json({
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

  }

}