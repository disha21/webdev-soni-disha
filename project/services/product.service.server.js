module.exports = function(app,model) {

    console.log("hello from product service");

    app.get('/api/user/:uid/search/:itemId',findProductByProductId);
    app.get('/api/user/:uid/dashboard/',findProductsTrackedByUser);
    app.get('/api/user/:uid/search/',findProductsByUser);
    app.post('/api/user/:uid/track/:productId',startTrackingItemPrice);
    app.post('/api/user/:uid/product/:productId/comments', addCommentToProduct );
    app.delete('/api/user/:uid/product/:productId', stopTrackingProductForUser);

    function stopTrackingProductForUser(req, res) {
        var productItemId = req.params.productId;
        var userId = req.params.uid;
        model
            .productModel.findProductByProductId(productItemId)
            .then(function (productObj) {
                model.userModel.deleteProductForUser(userId, productObj._id)
                    .then(function (userObj) {
                        model.productModel.removeUserFromProduct(productItemId, userId)
                            .then(function (prodObj) {
                                model.userModel.findUserById(userId)
                                    .then(function(user){
                                    res.send(user);
                                });

                            })
                    })
            }, function (error) {
                console.log("Got an error trying to remove a product " + error);
                res.sendStatus(400).send(error);
            });
    }


    function startTrackingItemPrice(req,res) {
        var userId = req.params.uid;
        var productId = req.params.productId;
        var product = req.body;

        console.log("UserID:" + userId + "ProductID:" + productId);
        console.log(product);
        model
            .productModel
            .startTrackingItemPrice(userId,productId,product)
            .then(function (msg) {
            res.send(msg);
        },function (error) {
            res.sendStatus(400).send(error);
        });



    }





    function findProductsTrackedByUser(req,res){
        var userId = req.params.uid;
        console.log("User id :" + userId);
        model
            .productModel
            .findProductsTrackedByUser(userId)
            .then(function (products) {
                    res.send(products);
                },function (error) {
                    res.sendStatus(400).send(error);
                }
            );



    }

    function findProductsByUser(req,res){
        var userId = req.params.uid;
        console.log("User id :" + userId);
        model
            .productModel
            .findProductsTrackedByUser(userId)
            .then(function (user) {
                console.log("user");
                console.log(user);
                    res.send(user);
                },function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }



    function findProductByProductId(req,res){
        var userId = req.params.uid;
        var itemId = req.params.itemId;
        console.log( "in find:" + itemId);
        model
            .productModel
            .findProductByProductId(itemId)
            .then(function (product) {
                    if(product !=null){
                        res.send(product);
                    }else{
                        res.send("0");
                    }
                },function (error) {
                    res.sendStatus(400).send(error);
                }
            );

    }


    function addCommentToProduct(req,res) {
        console.log("adding comment to product.");
        var userId = req.params.uid;
        var productId = req.params.productId;
        var requestBody = req.body;

        console.log("UserID:" + userId + "ProductID:" + productId);
        console.log(requestBody);
        model
            .productModel
            .addCommentToProductDAO(productId, userId, requestBody)
            .then(function (prod) {
               console.log("proooofoofofoff");
                console.log(prod);
                res.send(prod);

            },function (error) {
                res.sendStatus(400).send(error);
            });
    }
};
