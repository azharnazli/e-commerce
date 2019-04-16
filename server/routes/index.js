var express = require('express');
var router = express.Router();
const userRoute = require('./users/')
const productRoute = require('./product')
const cartRoute = require('./cart')

router.use('/users', userRoute)
router.use('/product', productRoute)
router.use('/cart', cartRoute)

module.exports = router;
