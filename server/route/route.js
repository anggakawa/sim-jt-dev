const UserController = require('../controllers/controller.user.js');
const ActivitiyController = require('../controllers/controller.activity');
const ActivConnController = require('../controllers/controller.activity_connections');
const RoleController = require('../controllers/controller.role.js');
const ActivOptController = require('../controllers/controller.activity_options.js');
const OrderController = require('../controllers/controller.order.js');
const STOOfficeController = require('../controllers/controller.sto_office.js');
const OrderHistory = require('../controllers/controller.order_history.js');
const ActivityTracker = require('../controllers/controller.activity_tracker.js');
const OrderVendorHistory = require('../controllers/controller.order_vendor.js');
const attachmentController = require('../controllers/controller.attachment.js');
const TaskController = require('../controllers/controller.task.js');
const MitraController = require('../controllers/controller.mitra_review.js');

const jwt = require('jsonwebtoken');

// check user's role is admin
function checkIfAdmin(req, res, next) {
  if (req.decoded.role_id === 1) {
    next();
  } else {
    return res.status(401).send({
      success: false,
      message: 'you are not authorized to access this URI'
    });
  }
}

module.exports = (router) => {

  router.get('/', (req, res) => res.send('Hello World'));
  router.post('/token', UserController.authenticateUser);
  
  // authenticate user
  router.use((req, res, next) => {
    const header = req.headers['authorization'];
    if (typeof header !== 'undefined') {
      const bearer = header.split(' ');
      const token = bearer[1];
      req.token = token;
    }
    const token = req.token || req.query.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, 'koderahasia', (err, decoded) => {
        if (err) return res.json({success: false, message: 'auth failed'});
        req.decoded = decoded;
        next();
      });
    } else {  
      return res.status(403).send({
        success: false, 
        message: 'No token provided'
      });
    }
  });

  router.post('/uploads/:orderLogsId', attachmentController.uploadFiles);
  router.get('/download/:attachmentId', attachmentController.downloadFile);

  router.get('/tasks-count/:roleId', TaskController.TaskCounter);
  router.get('/tasks/:roleId', TaskController.getTask);

  // role route
  router.get('/roles', RoleController.selectAllRoles);
  router.post('/roles/add', RoleController.createNewRole);
  router.delete('/roles/:roleId', RoleController.deleteRole);

  router.get('/vendors', UserController.getVendors);

  // user routes
  router.get('/users', UserController.getAllUsers);
  router.put('/users/edit', UserController.editUser);
  router.get('/user/:userId', UserController.selectUser);
  router.post('/user/add', checkIfAdmin, UserController.addnewUser);
  router.delete('/user/:userId', checkIfAdmin, UserController.deleteUser);

  // get data sto 
  router.get('/offices', STOOfficeController.getAllOffice);
  router.post('/offices/add', checkIfAdmin, STOOfficeController.createNewOffice);
  router.put('/updateOffice/:sto_office_id', checkIfAdmin, STOOfficeController.updateOffice);
  router.delete('/deleteOffice/:sto_office_id', checkIfAdmin, STOOfficeController.deleteOffice);

  // activity routes
  router.get('/activities', ActivitiyController.getAllActivity);
  router.put('/activity', checkIfAdmin, ActivitiyController.updateActivity);
  router.post('/activity/add', checkIfAdmin, ActivitiyController.createNewActivity);
  router.get('/activity/:activityId', ActivitiyController.getActivityById);
  router.delete('/activity/:activityId', checkIfAdmin, ActivitiyController.deleteActivity);

  // activity relations routes
  router.put('/activity-step/', ActivConnController.updateActivityConn);
  router.get('/activity-step/all', ActivConnController.getAllConnection);
  router.get('/activity-step/:activityId/:optionValue', ActivConnController.getNextStep);
  router.post('/activity-step', checkIfAdmin, ActivConnController.createConnection);
  router.delete('/activity-step/:activityConnId', checkIfAdmin, ActivConnController.deleteConnection);

  // options per activity routes
  router.get('/activity-options/all', ActivOptController.getAllActivityOptions);
  router.put('/activity-options/edit', checkIfAdmin, ActivOptController.updateActivityOpt);
  router.get('/activity-options/:activityId', ActivOptController.getActivityOptionsById);
  router.post('/activity-options', ActivOptController.createActivityOption);
  router.delete('/activity-options/:activityOptId', checkIfAdmin, ActivOptController.deleteActivity);

  router.get('/orders', OrderController.getAllOrder);
  router.put('/order/edit', checkIfAdmin, OrderController.updateOrder);
  router.put('/order/:orderId/:status', OrderController.closeOrder);
  router.get('/order/:orderId', OrderController.getOrderById);
  router.post('/orders/add', OrderController.createNewOrder);
  router.delete('/order/:orderId', checkIfAdmin, OrderController.deleteOrder);

  router.get('/order-history/all', OrderHistory.getAllOrderHistory);
  router.get('/order-history/latest-date/:orderId', OrderHistory.getOrderLogDate);
  router.get('/order-history/:orderId', OrderHistory.getAllOrderHistoryPerId);
  router.post('/order-history/post', OrderHistory.createNewOrderLog);
  router.post('/order-history/new', OrderHistory.createNewOrderlogBlank);
  router.put('/order-history/edit', OrderHistory.updateOrderLogInformation);
  router.delete('/order-history/:orderLogId', OrderHistory.deleteOrderLog);
  
  router.post('/order-vendor', OrderVendorHistory.addNewOrderVendor);
  router.get('/order-vendor/check/:orderId', OrderVendorHistory.checkIfVendorEligible);
  router.get('/order-vendor/:orderId', OrderVendorHistory.getOrderVendor);

  router.get('/activity-trackers', ActivityTracker.getAllActivityTracks);
  router.get('/current-activity/:orderId', ActivityTracker.getCurrentActivity);
  router.put('/current-activity/:orderId/:activityId', ActivityTracker.updateActivity);

  router.get('/mitra-history/all', MitraController.getMitraOrderList);
  router.get('/mitra-history/timelines', MitraController.getMitraTimeline);

}