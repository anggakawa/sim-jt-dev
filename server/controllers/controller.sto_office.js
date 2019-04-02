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
  },

  async createNewOffice(req, res) {
    try {
      const result = await pool.query(`INSERT INTO sto_office
        (sto_office_name)
        VALUES ('${req.body.sto_office_name}')`);
      res.json(result);
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        result: 'something gone wrong',
      });
    }
  },

  async updateOffice(req, res) {
    try {
      const result = await pool.query(`UPDATE sto_office SET sto_office_id = '${req.body.sto_office_id}', 
      sto_office_name = '${req.body.sto_office_name}' WHERE sto_office_id = '${req.body.sto_office_id}'`);
      res.json({
        success: true, 
        result: result
      });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        result: 'something gone wrong',
      });
    }
  },

  async deleteOffice(req, res) {
    try {
      const result = await pool.query(`DELETE FROM sto_office 
        WHERE sto_office_id = ${req.params.sto_office_id}`);
      res.json({
        success: true, 
        result : result,
      });
    } catch (error) {
      console.log(error);
      res.json({
        success: false, 
        result: 'something gone wrong',
      })
    }
  },

}