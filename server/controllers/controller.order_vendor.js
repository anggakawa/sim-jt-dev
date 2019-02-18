const pool = require('../config/db.js');

module.exports = {

  async getOrderVendor(req, res) {
    try {
      const result = await pool.query(`SELECT * FROM order_vendor_history o INNER JOIN users u
        ON o.vendor_id = u.user_id WHERE o.order_id = '${req.params.orderId}' ORDER BY history_id DESC`);
      res.json(result);
    } catch (error) {
      console.log(error);
      res.json({
        success: false, 
        result: 'something gone wrong',
      })
    }
  }, 

  async addNewOrderVendor(req, res) {
    try {
      const result = await pool.query(`INSERT INTO order_vendor_history (order_id, vendor_id, information)
        VALUES ('${req.body.order_id}', ${req.body.vendor_id}, '${req.body.vendor_information}')`);
      res.json(result);  
    } catch (error) {
      console.log(error);
      res.json({
        success: false, 
        result: 'something gone wrong'
      })
    }
  }


}