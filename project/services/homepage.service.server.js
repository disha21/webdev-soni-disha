module.exports = function (app, model) {

    var cron = require('node-cron');
    app.get('/api/search/:item', searchItem);
    app.post('/api/user/:uid/search/:itemId', createProductRecord);


    var http = require('http');
    var amazon = require('amazon-product-api');

    var amazonConfig = {
        clientId: process.env.AWS_ACCESS_KEY_ID,
        secret: process.env.AWS_SECRET_KEY,
        tag: process.env.AWS_ASSOCIATE_TAG
    }
    var ebayConfig = {
        appID: process.env.EBAY_APP_ID
    }


    var client = amazon.createClient({
        awsId: amazonConfig.clientId,
        awsSecret: amazonConfig.secret,
        awsTag: amazonConfig.tag
    });


    var productDetails = {
        productId: "",
        productPrice: ""
    };


 /*   cron.schedule('* * * * *', function () {
        console.log('running a task every minute' + Date.now());
        model
            .productModel
            .findAllProductIds()
            .then(function (prods) {
                console.log(prods);
                for (var prod in prods) {
                    console.log("prod.." + prod);
                    var productId = prods[prod].productId;
                    if (prods[prod].productProvider === "ebay") {
                        console.log(productId + " :prods[prod]");
                        searchEbayItembyIdAndAddPriceInDB(productId)
                            .then(function (productDetails) {
                                console.log(productId + " :Got a reply from ebay");


                            });
                    } else {
                        searchItemAmazonItemByIdAndAddInDB(prods[prod].productId)
                    }
                }
            });
    });*/

    function searchItemAmazonItemByIdAndAddInDB(itemId) {
        return client.itemLookup({
            Service: "AWSECommerceService",
            Operation: "ItemLookup",
            ResponseGroup: "Medium",
            ItemId: itemId

        }).then(function (results) {
            console.log("got resp for amazon itemlookup ");
            var amazonApiResult = results;
            console.log(amazonApiResult);
            updateProductPrice(itemId, amazonApiResult[0].ItemAttributes[0].ListPrice[0].FormattedPrice[0]);
            return amazonApiResult;
        }).catch(function (err) {
            console.log("got error");
            console.log(err[0].Error[0]);
        });
    }

    function updateProductPrice(productId, price) {
        console.log(productId + "Updating price of product, adding " + price);
        return model
            .productModel
            .updateProductPrice(productId, price)
            .then(function (product) {
                    res.send(product);
                }, function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function searchEbayItembyIdAndAddPriceInDB(item) {
        console.log(item + ": In search ebay by itemID");
        return new Promise(
            function (resolve, reject) {
                http.get({
                    host: "open.api.ebay.com",
                    path: "/shopping?callname=GetItemStatus&ResponseEncodingType=JSON&appid=" + ebayConfig.appID + "&siteid=0&version=967&ItemID=" + item
                }, function (response) {
                    var body = '';
                    response.on('data', function (d) {
                        body += d;
                    });
                    response.on('end', function () {
                        console.log(item + "Got all the respopnse from the server.");
                        var itemData = JSON.parse(body);
                        productDetails.productId = itemData.Item[0].ItemID;
                        productDetails.productPrice = itemData.Item[0].ConvertedCurrentPrice.Value;
                        console.log(item + ": Getting relevant infor from response. " + productDetails.productPrice);
                        updateProductPrice(productDetails.productId, productDetails.productPrice);
                        resolve("");
                    });
                }, function (error) {
                    reject("Could not get price from ebay " + error);
                });
            });

    }

    function searchItem(req, res) {
        var item = req.params.item;
        // var item ="ipod";
        searchItemEbay(item)
            .then(function (ebayResponse) {
                searchItemAmazon(item).then(function (amazonResponse) {
                    console.log("Got response from amazon " + amazonResponse);
                    var searchResponse = {
                        ebay: ebayResponse,
                        amazon: amazonResponse
                    };
                    console.log(searchResponse);
                    res.json(searchResponse);
                });


            }, function (err) {
                console.log("Got an error" + err)
            });
    }

    function searchItemEbay(item) {
        console.log("Searching item on eaby with name: " + item);
        item = encodeURIComponent(item.trim());
        console.log(item);
        return new Promise(
            function (resolve, reject) {
                http.get({
                    host: "open.api.ebay.com",
                    path: "/shopping?version=713" +
                    "&appid=" + ebayConfig.appID + "" +
                    "&callname=FindPopularItems" +
                    "&QueryKeywords=" + item +
                    "&ResponseEncodingType=JSON" +
                    "&AvailableItemsOnly=true" +
                    "&MaxEntries=10" +
                    "&PictureDetailsType=Gallery"
                }, function (response) {
                    var body = '';
                    response.on('data', function (d) {
                        body += d;
                    });
                    response.on('end', function () {
                        console.log("Got a successful response from ebay for item : " + item);

                        var ebayApiResult = JSON.parse(body);

                        console.log(ebayApiResult);
                        console.log(ebayApiResult.ItemArray.Item[0]);
                        //return ebayApiResult.ItemArray.Item;
                        resolve(ebayApiResult.ItemArray.Item);
                    });
                });

            });
    }

    function searchItemAmazon(item) {

        return client.itemSearch({
            Service: "AWSECommerceService",
            Operation: "ItemSearch",
            ResponseGroup: "Medium",
            SearchIndex: "All",
            Keywords: item

        }).then(function (results) {
            console.log("got resp");
            var amazonApiResult = results;
            // // console.log(amazonApiResult[0].ItemAttributes);
            //  console.log(amazonApiResult[0].ItemLinks[0].ItemLink);
            //  console.log(amazonApiResult[0]);

            return amazonApiResult;

            //res.json(amazonApiResult);

        }).catch(function (err) {
            console.log("got error");
            console.log(err[0].Error[0]);
        });
    }

    function createProductRecord(req, res) {
        var userId = req.params.uid;
        console.log("createProductRecord");
        console.log(req.body);
        var product = req.body;
        //res.send(200);
        model
            .productModel
            .createProductRecord(product, userId)
            .then(function (product) {
                    res.send(product);
                }, function (error) {
                    res.sendStatus(400).send(error);
                }
            );


    }


    module.exports = {
        getItemFromEbayByItemId : function (itemId) {
            console.log("getItemFromEbayId by itemId" + itemId)
            return new Promise(
                function (resolve, reject) {
                    http.get({
                        host: "open.api.ebay.com",
                        path: "/shopping?callname=GetSingleItem&ResponseEncodingType=JSON&appid=" + ebayConfig.appID + "&siteid=0&version=967&ItemID=" + itemId
                    }, function (response) {
                        var body = '';
                        response.on('data', function (d) {
                            body += d;
                        });
                        response.on('end', function () {
                            console.log(itemId + "Got all the response from the server.");
                            var itemData = JSON.parse(body);
                            resolve(itemData);
                        });
                    }, function (error) {
                        reject("Could not get price from ebay " + error);
                    });
                });

        },

        getItemFromAmazonByItemId : function (itemId) {
            return client.itemLookup({
                Service: "AWSECommerceService",
                Operation: "ItemLookup",
                ResponseGroup: "Medium",
                ItemId: itemId

            }).then(function (results) {
                console.log("got resp for amazon itemlookup ");
                var amazonApiResult = results;
                console.log(amazonApiResult);
                // updateProductPrice(itemId, amazonApiResult[0].ItemAttributes[0].ListPrice[0].FormattedPrice[0]);
                return amazonApiResult;
            }).catch(function (err) {
                console.log("got error");
                console.log(err[0].Error[0]);
            });
        }
    }

};