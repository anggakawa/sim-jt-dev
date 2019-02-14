const pool = require('../config/db.js');
const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, 'uploads/');
  },
  filename(req, file, callback) {
    callback(null, `${req.params.orderLogsId} - ${file.originalname}`);
  }
});
const upload = multer({
  storage: storage
}).array('attachments', 5);

module.exports = {
  
  async uploadFiles(req, res) {
    upload(req, res, (err) => {
      if (err) {
        console.log(err);
        return res.json({
          success: false, 
          result: 'something gone wrong',
        });
      }
      const orderLogsId = req.params.orderLogsId;
      const files = req.files;
      const arrayOfFiles = files.map((file) => {
        return [orderLogsId, file.path, file.filename];
      });
      pool.query(`INSERT INTO order_attachment (order_logs_id, path, attachment_name)
          VALUES ?`, [arrayOfFiles]).then((result) => {
        res.json({
          success: true,
          result: result,
        });
      }).catch((err) => {
        console.log(err);
        res.json({
          success: false,
          result: 'something gone wrong'
        })
      })
    });
  }, 

  async downloadFile(req, res) {
    try {
      const result = await pool.query(`SELECT path FROM order_attachment WHERE order_attachment_id = ${req.params.attachmentId}`);
      res.download(result[0].path);
    } catch (error) {
      console.log(error);
      res.json({
        success: false, 
        result: 'something gone wrong'
      });
    }
  },


}