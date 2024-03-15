const express = require('express');
const { createOrder, showOrder } = require('../controller/order');
const router = express.Router();


router.get("", showOrder);
router.post("", createOrder);
module.exports = router;
