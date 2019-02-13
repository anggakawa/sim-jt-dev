const pool = require('../config/db.js');

module.exports = {

  async getAllOrder(req, res){
    try {
      const result = await pool.query(`SELECT * FROM orders INNER JOIN sto_office ON orders.sto_office_id = sto_office.sto_office_id`);
      res.json(result);
    } catch (error) {
      console.log(error);
      return res.json({
        success: false, 
        result: 'something gone wrong'
      });
    }
  }, 

  async createNewOrder(req, res) {
    try {
      const latitude = parseFloat(req.body.customer_coordinat_latitude);
      const longitude = parseFloat(req.body.customer_coordinat_longitude); 
      const result = await pool.query(`INSERT INTO orders 
        (order_id, date, customer_name, customer_address, service_name, sto_office_id, customer_coordinat_latitude, 
        customer_coordinat_longitude, pic_name, pic_contact, open_status) VALUES
        ('${req.body.order_id}', '${req.body.date}', '${req.body.customer_name}',
        '${req.body.customer_address}', '${req.body.service_name}', 
        ${req.body.sto_office_id}, ${latitude}, 
        ${longitude}, 
        '${req.body.pic_name}', '${req.body.pic_contact}', true)`);
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
      const result = await pool.query(`SELECT * FROM orders 
        INNER JOIN sto_office ON orders.sto_office_id = sto_office.sto_office_id
        WHERE order_id = '${req.params.orderId}'`);
      res.json(result);
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
      const result = await pool.query(`DELETE FROM orders WHERE order_id = '${req.params.orderId}'`);
      res.json({
        success: true, 
        result: result
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false, 
        result: 'something gone wrong'
      });
    }
  }, 

  async closeOrder(req, res) {
    try {
      const result = await pool.query(`UPDATE orders SET open_status = false WHERE order_id = '${req.params.orderId}'`);
      res.json(result);
    } catch (error) {
      console.log(error);
      res.json({
        success: false, 
        result: 'something gone wrong',
      });
    }
  }, 

}