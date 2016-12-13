/**
 * Created by dishasoni on 11/15/16.
 */
module.exports = function () {
    var model = {};
    var mongoose = require('mongoose');
    var UserSchema = require("../user/user.schema.server.js")();
    var ProductSchema = require("./product.schema.server.js")();
    var ProductModel = mongoose.model("ProductModel", ProductSchema);


    var api = {

        setModel: setModel,
        createProductRecord: createProductRecord,
        findProductByProductId: findProductByProductId,
        findAllProductIds: findAllProductIds,
        updateProductPrice: updateProductPrice,
        findProductsTrackedByUser: findProductsTrackedByUser,
        findAllTrackedProducts: findAllTrackedProducts,
        startTrackingItemPrice: startTrackingItemPrice,
        addCommentToProductDAO: addCommentToProductDAO,
        removeUserFromProduct: removeUserFromProduct,
        findProductsByIds: findProductsByIds
    };

    return api;

    function findProductsByIds(ids) {
        return ProductModel.find({
            '_id': { $in: ids}
        }, function(err, docs){
            console.log(docs);
        });
    }


    function removeUserFromProduct(productItemId, userId) {
        return ProductModel.find({
            productId : productItemId
        }).then(function (productObjArray) {
            var productObj = productObjArray[0];

            for(i in productObj.users ) {
                if (productObj.users[i] == userId) {
                    console.log("found the user id at index" + i);
                    productObj.users.splice(i, 1);
                }
            }
            console.log("length " + productObj.users.length );
            if(productObj.users.length == 0){
                return deleteProductByProductItemId(productItemId)
            }
            return productObj.save();
        })

    }

    function deleteProductByProductItemId(productItemId) {
        return ProductModel.remove({
            productId : productItemId
        });
    }


    function setModel(_model) {
        model = _model;
    }


    function startTrackingItemPrice(userId, productId, product) {
        return findProductByProductId(productId)
            .then(function (prodObj) {
                if (prodObj != null) {
                    console.log("Product does  exist" + productId);
                    return model.userModel.findProductTrackerByUserAndProductId(userId, prodObj._id)
                        .then(function (obj) {
                            if (obj.length > 0) {
                                console.log("User already tracking this item");
                                return {msg: "User already tracking this item"}
                            } else {
                                console.log("User not tracking this item.")
                                return addProductToUser(userId, prodObj)
                                    .then(function (obj) {
                                        return {msg: "Started tracking your product."}
                                    })

                            }

                        })

                }
                else {
                    console.log("Product does not exist" + productId)
                    return createProductRecord(product, userId)
                        .then(function (obj) {
                            return {msg: "Started tracking your product."}

                        })

                }
            })

    }

    function addProductToUser(userId, productObj) {
        console.log("addProductToUser" + productObj._id);
        return model
            .userModel
            .findUserById(userId)
            .then(function (userObj) {
                console.log("updating stuff...");
                productObj.users.push(userObj._id)
                userObj.products.push(productObj._id)
                userObj.save();
                return productObj.save();
            });
    }



    function updateProductPrice(productId, price) {
        console.log(productId + "Updating price for product");
        return ProductModel.findOne({
            productId: productId
        }).then(function (productObj) {
            var productDetails = {
                price: price
            };
            productObj.productDetails.push(productDetails);
            return productObj.save();
        });
    }

    function findAllTrackedProducts() {
        // return ProductModel.find().distinct('productId','productProvider');
        return ProductModel.find({});

    }

    function findAllProductIds() {
        // return ProductModel.find().distinct('productId','productProvider');
        return ProductModel.find({}).select('productId -_id + productProvider');

    }

    function findProductByProductId(productId) {
        return ProductModel.findOne({
            productId: productId
        });
    }

    function createProductRecord(product, userId) {
        return ProductModel.create(product)
            .then(function (productObj) {
                return model
                    .userModel
                    .findUserById(userId)
                    .then(function (userObj) {
                        productObj.users.push(userObj._id)
                        userObj.products.push(productObj._id)
                        userObj.save();
                        return productObj.save();
                    });
            });
    }

    function findProductsTrackedByUser(userId) {
        console.log("findAllWebsitesForUser");
        return model.userModel.findProductsTrackedByUser(userId);
    }

    function addCommentToProductDAO(productItemId, userId, commentBody) {
        return model
            .userModel.findUserById(userId)
            .then(function (userObj) {
               return model
                    .productModel
                    .findProductByProductId(productItemId)
                    .then(function (product) {
                        commentBody.userName = userObj.username;
                        product.comments.push(commentBody);
                        return product.save();
                    })

            })



    }


};