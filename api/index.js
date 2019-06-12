'use strict';

const express = require('express');
const router = express.Router();
const wallmartlabs = require('../models/wallmartlabs');
const wallmart = new wallmartlabs();
const filter = require('../utils/filter');
router.get('/products',function(request,response,next) {
    wallmart.fetch((err, products) => {
        response.json({products : filter(products,request.query)});
    });
});
module.exports = router;