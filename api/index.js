'use strict';

const express = require('express');
const router = express.Router();
const wallmartlabs = require('../models/wallmartlabs');
const wallmart = new wallmartlabs();
router.get('/products',function(request,response,next) {
    console.log(request.query);
    wallmart.fetch((err, products) => {
        response.json({products : products});
    });
});
module.exports = router;