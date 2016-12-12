module.exports = function(app,model) {

    console.log("hello from product service");


    app.get('/api/product/:productId/type/:productType/details', getProductDetailsByProductId)

    var externalService = require('./homepage.service.server');

    function getProductDetailsByProductId(req, res) {
        var productId = req.params.productId;
        var productType = req.params.productType;
        var response = {
            productDetails : null,
            tracking : false,
            comments : null,
            ratings : null,
            numberOfPeopleTracking : null
        };
        console.log("Product type " + productType)
        if(productType === "ebay"){
            externalService.getItemFromEbayByItemId(productId)
                .then(function (itemObj) {
                    console.log("Got success response from eby");
                    response.productDetails = itemObj;
                    model
                        .productModel
                        .findProductByProductId(productId)
                        .then(function (trackedItem) {
                            console.log("Got a response from DB" + trackedItem);
                            if(trackedItem != null) {
                                response.tracking = true;
                                response.comments = trackedItem.comments;
                                response.numberOfPeopleTracking = trackedItem.users.length;
                            }
                            res.send(response)
                        })

                },function (error) {
                    res.sendStatus(400).send(error);
                })


        } else if(productType === "amazon") {
            externalService.getItemFromAmazonByItemId(productId)
                .then(function (itemObj) {
                    response.productDetails = itemObj;
                    model
                        .productModel
                        .findProductByProductId(productId)
                        .then(function (trackedItem) {
                            if(trackedItem != null){
                                response.tracking = true;
                                response.comments = trackedItem.comments;
                                response.numberOfPeopleTracking = trackedItem.users.length;
                            }
                            res.send(response)
                        })

                },function (error) {
                    res.sendStatus(400).send(error);
                })
        }

    }

};
