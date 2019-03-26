const pool = require('../config/db.js');

module.exports = {

  async getOrderVendor(req, res) {
    try {
      const result = await pool.query(`SELECT * FROM order_vendor_history o INNER JOIN users u
        ON o.vendor_id = u.user_id WHERE o.order_id = '${req.params.orderId}' AND o.replaced = false`);
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
      if (req.body.replaced) {
        const result = await pool.query(`UPDATE order_vendor_history SET replaced = ${req.body.replaced} 
          WHERE order_id = '${req.body.order_id}'`)
          .then(() => {
            pool.query(`INSERT INTO order_vendor_history (order_id, vendor_id, information, replaced)
              VALUES ('${req.body.order_id}', ${req.body.vendor_id}, '${req.body.vendor_information}', false)`)
          })
        return res.json(result);
      }
      const result = await pool.query(`INSERT INTO order_vendor_history (order_id, vendor_id, information, replaced)
          VALUES ('${req.body.order_id}', ${req.body.vendor_id}, '${req.body.vendor_information}', ${req.body.replaced})`);
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