module.exports = function (app) {

    console.log("hello from homepage service");

    var cron = require('node-cron');

    app.get('/api/search/:item', searchItem);
    app.post('/api/user/:uid/:itemId', createProductRecord);

    var http = require('http');
    var amazon = require('amazon-product-api');

    var client = amazon.createClient({
        awsId: "",
        awsSecret: "",
        awsTag: ""
    });




    cron.schedule('0 * * * *', function(){
        console.log('running a task every day' + Date.now());
    });

    function searchItem(req, res) {
        var item = req.params.item;
       // var item ="ipod";
        searchItemEbay(item)
            .then(function (ebayResponse) {
                searchItemAmazon(item).then(function (amazonResponse) {
                    var searchResponse = {
                        ebay: ebayResponse,
                        amazon: amazonResponse
                    };
                    console.log(searchResponse);
                    res.json(searchResponse);
                });


            });
    }

    function searchItemEbay(item) {
        return new Promise(
            function (resolve, reject) {
                http.get({
                    host: "open.api.ebay.com",
                    path: "/shopping?version=713&appid=e&callname=FindPopularItems&QueryKeywords=" + item + "&ResponseEncodingType=JSON"
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

    function createProductRecord(req,res) {
        console.log("createProductRecord");
        console.log(req.query.itemId);
        console.log(req.body);

    }

};