const router = require('express').Router();
const auth = require('../v1/authentication/auth.js')();

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

router.options('*', (req, res) => {
  res.sendStatus(200);
});

router.use('/user', require('./user/user.js'));

router.use('/secure', auth.authenticate(), (req, res) => {
  res.send(`Secure response from ${JSON.stringify(req.user)}`);
});

router.use('/field', auth.authenticate(), require('./field/field.js'));

module.exports = router;
