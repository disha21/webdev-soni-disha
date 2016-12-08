module.exports = function (app,model) {

    var cron = require('node-cron');
    app.get('/api/search/:item', searchItem);
    app.post('/api/user/:uid/search/:itemId', createProductRecord);

    var http = require('http');
    var amazon = require('amazon-product-api');

    var amazonConfig = {
        clientId : process.env.AWS_ACCESS_KEY_ID,
        secret : process.env.AWS_SECRET_KEY,
        tag : process.env.AWS_ASSOCIATE_TAG
    }
    var ebayConfig = {
        appID : process.env.EBAY_APP_ID
    }


    var client = amazon.createClient({
        awsId: amazonConfig.clientId,
        awsSecret: amazonConfig.secret,
        awsTag: amazonConfig.tag
    });




    var productDetails = {
        productId:"",
        productPrice: ""
    };


   /* cron.schedule('* * * * *', function(){
        console.log('running a task every minute' + Date.now());
        model
            .productModel
            .findAllProductIds()
            .then(function(prods){
                console.log(prods);
                for(var prod in prods){
                    console.log("prod.." + prod);
                    var productId = prods[prod].productId;
                    if(prods[prod].productProvider === "ebay"){
                        console.log(productId + " :prods[prod]");
                        // var ebayProducts = prods[prod];
                        searchEbayItembyId(productId)
                            .then(function(productDetails){
                            console.log(productId + " :Got a reply from ebay");
                                console.log(itemData);
                               // productData.push(productDetails);
                                console.log(productId + " : body of reply "+productData);
                            });
                    }else {
                        searchItemAmazonById(prods[prod].productId)
                    }
                }
            });
    });*/


    function updateProductPrice(productId,price){
        console.log(productId + "Updating price of product, adding " + price);
        model
            .productModel
            .updateProductPrice(productId,price)
            .then(function (product) {
                    res.send(product);
                }, function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

   function searchEbayItembyId(item) {
        console.log(item + ": In search ebay by itemID");
        return new Promise(
            function (resolve, reject) {
                http.get({
                    host: "open.api.ebay.com",
                    path:"/shopping?callname=GetItemStatus&ResponseEncodingType=JSON&appid="+ ebayConfig.appID + "&siteid=0&version=967&ItemID=" +item
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
                        updateProductPrice(productDetails.productId,productDetails.productPrice );
                        resolve("");
                    });
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
        console.log("item"+ item);
        item = encodeURIComponent(item.trim());
        console.log(item);
        return new Promise(
            function (resolve, reject) {
                http.get({
                    host: "open.api.ebay.com",
                    path: "/shopping?version=713&appid="+ ebayConfig.appID +"&callname=FindPopularItems&QueryKeywords=" + item + "&ResponseEncodingType=JSON"
                }, function (response) {
                    var body = '';
                    response.on('data', function (d) {
                        body += d;
                    });
                    response.on('end', function () {
                        var ebayApiResult = JSON.parse(body);
                        console.log(ebayApiResult);
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

    function createProductRecord(req,res) {
        var userId = req.params.uid;
        console.log("createProductRecord");
        console.log(req.body);
        var product = req.body;
        //res.send(200);
        model
            .productModel
            .createProductRecord(product,userId)
            .then(function (product) {
                    res.send(product);
                }, function (error) {
                    res.sendStatus(400).send(error);
                }
            );


    }

};