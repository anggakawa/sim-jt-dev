const pool = require('../config/db.js');

module.exports = {

  async getAllOrder(req, res){
    try {
      if (req.decoded.role_id === 3) {
        const result = await pool.query(`SELECT * FROM orders INNER JOIN sto_office ON orders.sto_office_id = sto_office.sto_office_id
          INNER JOIN activity_track ON orders.order_id = activity_track.order_id
          INNER JOIN activity ON activity_track.activity_id = activity.activity_id
          INNER JOIN roles ON roles.role_id = activity.role_id
          INNER JOIN order_vendor_history ON order_vendor_history.order_id = orders.order_id 
          WHERE order_vendor_history.vendor_id = ${req.decoded.user_id}`);
        res.json(result);
      } else {
        const result = await pool.query(`SELECT * FROM orders INNER JOIN sto_office ON orders.sto_office_id = sto_office.sto_office_id
          INNER JOIN activity_track ON orders.order_id = activity_track.order_id
          INNER JOIN activity ON activity_track.activity_id = activity.activity_id
          INNER JOIN roles ON roles.role_id = activity.role_id`);
        res.json(result);
      }
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
          '${req.body.pic_name}', '${req.body.pic_contact}', 1)`)
        .then(() => {
          return pool.query(`INSERT INTO order_logs
            (order_id, activity_id, information, status, date, user_id)
            VALUES ('${req.body.order_id}', 1, '${req.body.information}',
            1, NOW(), ${req.decoded.user_id})`);
        });
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

  async updateOrder(req, res) {
    try {
      const latitude = parseFloat(req.body.customer_coordinat_latitude);
      const longitude = parseFloat(req.body.customer_coordinat_longitude);
      const result = await pool.query(`UPDATE orders SET date = '${req.body.date}', customer_name = '${req.body.customer_name}',
        customer_address = '${req.body.customer_address}', service_name = '${req.body.service_name}', sto_office_id = ${req.body.sto_office_id},
        customer_coordinat_latitude = ${latitude}, customer_coordinat_longitude = ${longitude},
        pic_name = '${req.body.pic_name}', pic_contact = '${req.body.pic_contact}', open_status = ${req.body.open_status} WHERE order_id = '${req.body.order_id}'`);
      res.json({
        success: true, 
        result: result
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        result: 'something gone wrong',
      })
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
      const result = await pool.query(`UPDATE orders SET open_status = ${req.params.status} WHERE order_id = '${req.params.orderId}'`);
      res.json(result);
    } catch (error) {
      console.log(error);
      res.json({
        success: false, 
        result: 'something gone wrong',
      });
    }
  },

  async getOrderStats(req, res) {
    
  }

}