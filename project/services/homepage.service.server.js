module.exports = function (app) {

    console.log("hello from homepage service");


    app.get('/api/search/:item', searchItem);
    var http = require('http');
    var amazon = require('amazon-product-api');

    var client = amazon.createClient({
        awsId: "AKIAIETNH5QK5TPBIJJQ",
        awsSecret: "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",
        awsTag: "awsTag"
    });


    function searchItem(req, res) {
        var item = req.params.item;
        searchItemEbay(item)
            .then(function (ebayResponse) {
                searchItemAmazon(item).then(function (amazonResponse) {
                    var searchResponse = {
                        ebay: ebayResponse,
                        amazon: amazonResponse
                    };
                    res.json(searchResponse);
                });


            });


    }

    function searchItemEbay(item) {
        return new Promise(
            function (resolve, reject) {
                http.get({
                    host: "open.api.ebay.com",
                    path: "/shopping?version=713&appid=DishaSon-PriceCom-PRD-c45f64428-9125085e&callname=FindPopularItems&QueryKeywords=" + item + "&ResponseEncodingType=JSON"
                }, function (response) {
                    var body = '';
                    response.on('data', function (d) {
                        body += d;
                    });
                    response.on('end', function () {
                        var ebayApiResult = JSON.parse(body);
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
            console.log(err.Error[0]);
        });
    }


};