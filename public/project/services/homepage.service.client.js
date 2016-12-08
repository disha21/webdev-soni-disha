

(function() {
    angular
        .module("webdevProject")
        .factory("HomepageService", HomepageService);

    function HomepageService($http) {

        var api = {
            "searchItem"   : searchItem,
            createProductRecord:createProductRecord

        };

        return api;


        function searchItem(item) {
            var url="/api/search/"+item;
            console.log(url);
           return $http.get(url);
        }
        function createProductRecord(userId,itemId,itemPrice,productProvider,title){
            console.log(title);
            var product = {
                productId:itemId,
                productProvider:productProvider,
                productDetails : {
                    price : itemPrice
                },
               productTitle:  title

            };
            console.log("createProductRecord service");
            console.log(itemId );
            console.log(product );
            var url="/api/user/"+ userId +"/search/" + itemId;
            console.log(url);
            return $http.post(url,product);
        }


    }
})();

