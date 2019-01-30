const UserController = require('../controllers/controller.user.js');

module.exports = (router) => {
  router.get('/', (req, res) => res.send('Hello World'));

  // user routes
  router.get('/users/:userId', UserController.selectUser);
  router.post('/users/add', UserController.addnewUser);
  router.delete('/users/:userId', UserController.deleteUser);
  router.post('/token', UserController.authenticateUser);

  
}