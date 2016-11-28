

(function() {
    angular
        .module("webdevProject")
        .factory("HomepageService", HomepageService);

    function HomepageService($http) {

        var api = {
            "searchItem"   : searchItem

        };

        return api;


        function searchItem(item) {
            var url="/api/search/"+item;
            console.log(url);
          //  var url = "http://open.api.ebay.com/shopping?version=713&appid=DishaSon-PriceCom-PRD-c45f64428-9125085e&callname=FindPopularItems&QueryKeywords=" + item + "&ResponseEncodingType=JSON";
           return $http.get(url);

        }


    }
})();

