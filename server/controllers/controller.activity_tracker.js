const pool = require('../config/db.js');

module.exports = {
  
  async getCurrentActivity(req, res) {
    try {
      const result = await pool.query(`SELECT * FROM activity_track INNER JOIN activity 
        ON activity_track.activity_id = activity.activity_id WHERE order_id = '${req.params.orderId}'`);
      res.json(result);
    } catch (error) {
      console.log(error);
      res.json({
        success: false, 
        result: 'something gone wrong',
      })
    }
  }, 

  async updateActivity(req, res) {
    try {
      const result = await pool.query(`UPDATE activity_track SET activity_id = ${req.params.activityId}
        WHERE order_id = '${req.params.orderId}'`);
      res.json({
        success: true, 
        result: result, 
        message: 'berhasil mengupdate',
      })
    } catch (error) {
      console.log(error);
      res.json({
        success: false, 
        result: 'something gone wrong',
      })
    }
  }

}