'use strict';
function convertToBoolean(input) {
    return /true/i.test(input);
}
function filter(list, query) {
    let output = [];
    list.forEach((product, index) => {
        let match = true;
        Object.keys(query).forEach((filter) => {
            switch(filter) {
                case 'search' : 
                    // if search filter does not match , reject the product
                    if(typeof query[filter] === 'string' 
                    && !product.productName.toLowerCase().includes(query[filter].toLowerCase())) {
                        match = match && false;
                    }
                    break;
                case 'price' :
                    let productPrice = parseFloat(product.price.replace('$',''));
                    // if price does not exactly match , reject the product
                    if(typeof query[filter] === 'string' && productPrice !== parseFloat(query[filter])) {
                        match = match && false;
                    } else if(typeof query[filter] === 'object') {
                        // if min price condition fails, reject the product
                        if(query[filter].min && productPrice < parseFloat(query[filter].min)) {
                            match = match && false;
                        }
                        // if max price condition fails, reject the product
                        if(query[filter].max && productPrice > parseFloat(query[filter].max)) {
                            match = match && false;
                        }
                    }
                    break;
                case 'reviewRating':
                case 'reviewCount':
                    let value = product[filter];
                    // if rating/count does not exactly match , reject the product
                    if(typeof query[filter] === 'string' && value !== parseFloat(query[filter])) {
                        match = match && false;
                    } else if(typeof query[filter] === 'object') {
                        // if min rating/count condition fails, reject the product
                        if(query[filter].min && value < parseFloat(query[filter].min)) {
                            match = match && false;
                        }
                        // if max rating/count condition fails, reject the product
                        if(query[filter].max && value > parseFloat(query[filter].max)) {
                            match = match && false;
                        }
                    }
                    break;
                case 'inStock':
                    // if inStock filter does not match , reject the product
                    if(typeof query[filter] === 'string' && product.inStock != convertToBoolean(query[filter])) {
                        match = match && false;
                    }
                    break;
            }
        });
        if(match) {
            output.push(product);
        }
    });
    return output;
}
module.exports = filter;