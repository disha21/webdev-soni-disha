module.exports = function(app,model) {

    console.log("hello from product service");






    app.get('/api/user/:uid/search/:itemId',findProductByProductId);
    app.get('/api/user/:uid/dashboard/',findProductsTrackedByUser);


    app.get('/api/user/:uid/search/',findProductsByUser);
    app.get('/api/user/:uid/search/:productId',addUserandProduct);
    app.post('/api/user/:uid/track/:productId',startTrackingItemPrice);
    app.post('/api/user/:uid/product/:productId/comments', addCommentToProduct )


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



    function addUserandProduct(req,res){
        console.log("In server addUserandProduct");
        var userId = req.params.uid;
        var productId = req.params.productId;
        console.log("User id :" + userId + "productId:"+productId);
        model
            .productModel
            .addUserandProduct(userId,productId)
            .then(function (status) {
                res.send(200);
            },function (error) {
                res.sendStatus(400).send(error);
            }
        );
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
            .then(function (msg) {
                res.send(msg);
            },function (error) {
                res.sendStatus(400).send(error);
            });
    }
};
