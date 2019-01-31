const UserController = require('../controllers/controller.user.js');
const ActivitiyController = require('../controllers/controller.activity');
const ActivConnController = require('../controllers/controller.activity_connections');

const jwt = require('jsonwebtoken');

module.exports = (router) => {
  router.get('/', (req, res) => res.send('Hello World'));
  router.post('/token', UserController.authenticateUser);
  
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
        if (err) return res.json({token: token, message: 'auth failed'});
        req.decoded = decoded;
        next();
      });
    } else {  
      return res.status(403).send({
        success: false, 
        message: 'No token provided'
      });
    }
  })

  // user routes
  router.get('/users/:userId', UserController.selectUser);
  router.post('/users/add', UserController.addnewUser);
  router.delete('/users/:userId', UserController.deleteUser);
  
  // activity routes
  router.get('/activities', ActivitiyController.getAllActivity);
  router.post('/activity/add', ActivitiyController.createNewActivity);
  router.get('/activity/:activityId', ActivitiyController.getActivityById);
  router.delete('/activity/:activityId', ActivitiyController.deleteActivity);

  router.get('/activity-step/:activityId/:optionValue', ActivConnController.getNextStep);
  router.post('/activity-step', ActivConnController.createConnection);
  router.delete('/activity-step/:activityConnId', ActivConnController.deleteConnection);
}