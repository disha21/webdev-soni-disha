/**
 * Created by dishasoni on 11/15/16.
 */
module.exports = function () {
    var mongoose = require('mongoose');


    var ProductSchema = mongoose.Schema({
        productId: String,
        productProvider: String,
        productDetails: [{
            dateCreated: {type: Date, default: Date.now},
            price: String
        }],
        productTitle: String,
        imageUrl: String,
        users: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserProjectModel'}],
        comments: [{
            userName: String,
            comment: String
        }],
        dateCreated: {type: Date, default: Date.now}

    }, {collection: "product"});

    return ProductSchema;
};