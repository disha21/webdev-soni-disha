module.exports = function (app) {

    console.log("hello from homepage service");


    app.get('/api/search/:item', searchItem);
    var http = require('http');

    function searchItem(req, res) {
        //console.log(req);


        // var ebayApi = "http://open.api.ebay.com/shopping?version=713&appid=DishaSon-PriceCom-PRD-c45f64428-9125085e&callname=FindPopularItems&QueryKeywords=" + item + "&ResponseEncodingType=JSON";
        var item = req.params.item;
        return http.get({
            host: "open.api.ebay.com",
            path: "/shopping?version=713&appid=DishaSon-PriceCom-PRD-c45f64428-9125085e&callname=FindPopularItems&QueryKeywords=" + item + "&ResponseEncodingType=JSON"
        }, function (response) {
            // Continuously update stream with data
            var body = '';
            response.on('data', function (d) {
                body += d;
            });
            response.on('end', function () {
            //var ebayApiResult = JSON.parse(JSON.stringify(body));
                var ebayApiResult = JSON.parse(body);
                //console.log(ebayApiResult);

                // Data reception is done, do whatever with it!

              console.log(ebayApiResult.ItemArray.Item);
                res.json(ebayApiResult.ItemArray.Item);
            });
        });

    }


};