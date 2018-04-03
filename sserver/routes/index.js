const router = require('express').Router();

router.get('/', (req, res) => {
  res.json({ uptime: new Date() });
});

router.use('/products', require('./products'));

module.exports = router;
