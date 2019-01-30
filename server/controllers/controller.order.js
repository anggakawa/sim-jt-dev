const pool = require('../config/db.js');

module.exports = {

  async createNewOrder(req, res) {
    try {
      const result = await pool.query(`INSERT INTO order 
        (date, customer_name, customer_address, sto_office_id, customer_coordinat_latitude, 
        customer_coordinat_longitude, pic_name, pic_contact, vendor_id) VALUES
        ('${req.body.date}', '${req.body.customer_name}',
        '${req.body.customer_address}', '${req.body.service_name}', 
        ${req.body.sto_office_id}, ${req.body.latitude}, ${req.body.longitude}, 
        '${req.body.pic_name}', '${req.body.pic_contact}', ${req.body.vendor_id})`);
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

  async getOrderById(req, res) {
    try {
      const result = await pool.query(`SELECT * FROM order WHERE order_id = '${req.params.orderId}'`);
      res.json({ result });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false, 
        result: 'something gone wrong'
      });
    }
  }, 

  async getAllOrder(req, res){
    try {
      const result = await pool.query(`SELECT * FROM order`);
      res.json({result});
    } catch (error) {
      console.log(error);
      return res.json({
        success: false, 
        result: 'something gone wrong'
      });
    }
  }, 

  async deleteOrder(req, res) {
    try {
      const result = await pool.query(`DELETE FROM order WHERE order_id = '${req.params.orderId}'`)
    } catch (error) {
      console.log(error);
      return res.json({
        success: false, 
        result: 'something gone wrong'
      });
    }
  }
}