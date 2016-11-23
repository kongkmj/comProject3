const express = require('express');
const router = express.Router();
const controller = require('./controller');


router.get('/',controller.index);
router.get('/login',controller.login);
router.get('/door',controller.door);
router.get('/light',controller.light);
router.get('/aircon',controller.aircon);
router.get('/temp',controller.temp);
router.get('/humi',controller.humi);
router.get('/gas',controller.gas);
router.get('/fire',controller.fire);

module.exports = router;
