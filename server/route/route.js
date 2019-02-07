const UserController = require('../controllers/controller.user.js');
const ActivitiyController = require('../controllers/controller.activity');
const ActivConnController = require('../controllers/controller.activity_connections');
const RoleController = require('../controllers/controller.role.js');
const ActivOptController = require('../controllers/controller.activity_options.js');

const jwt = require('jsonwebtoken');

// check user's role is admin
function checkIfAdmin(req, res, next) {
  if (req.decoded.payload.role_id === 1) {
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

  // role route
  router.get('/roles', RoleController.selectAllRoles);
  router.post('/roles/add', RoleController.createNewRole);
  router.delete('/roles/:roleId', RoleController.deleteRole);

  // user routes
  router.get('/users', UserController.getAllUsers);
  router.get('/user/:userId', UserController.selectUser);
  router.post('/user/add', checkIfAdmin, UserController.addnewUser);
  router.delete('/user/:userId', checkIfAdmin, UserController.deleteUser);
  
  // activity routes
  router.get('/activities', ActivitiyController.getAllActivity);
  router.post('/activity/add', checkIfAdmin, ActivitiyController.createNewActivity);
  router.get('/activity/:activityId', ActivitiyController.getActivityById);
  router.delete('/activity/:activityId', checkIfAdmin, ActivitiyController.deleteActivity);

  // activity relations routes
  router.get('/activity-step/all', ActivConnController.getAllConnection);
  router.get('/activity-step/:activityId/:optionValue', ActivConnController.getNextStep);
  router.post('/activity-step', checkIfAdmin, ActivConnController.createConnection);
  router.delete('/activity-step/:activityConnId', checkIfAdmin, ActivConnController.deleteConnection);

  // options per activity routes
  router.get('/activity-options/all', ActivOptController.getAllActivityOptions);
  router.get('/activity-options/:activityId', ActivOptController.getActivityOptionsById);
  router.post('/activity-options', ActivOptController.createActivityOption);
  router.delete('/activity-options/:activityOptId', ActivOptController.deleteActivity);

}