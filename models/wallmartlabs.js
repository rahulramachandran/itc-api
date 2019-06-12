'use strict';

const config = require('../config/config');
const axios = require('axios');

function product() {
    this.products = [];
	this.fetch = function(callback) {
		if(this.products.length) {
            // Get Products from local cache
            callback(null,this.products);
        } else {
            // Fetch Products from API
            let error;
            axios.get(config.urls.products).then((response) => {
                this.products = response.data.products;
            }).catch(err => {
                error = err;
            }).finally(() => {
                callback(error,this.products);
            });
        }
	}
}

module.exports = product;