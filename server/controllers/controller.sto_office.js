const pool = require('../config/db.js');

module.exports = {

  async getAllOffice(req, res) {
    try {
      const result = await pool.query(`SELECT * FROM sto_office`);
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