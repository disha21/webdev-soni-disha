(function () {
    angular
        .module("webdevProject")
        .factory("ProductDetailsPageService", ProductDetailsPageService);


    function ProductDetailsPageService($http) {

        var api = {
            showProductDetails: showProductDetails
        };

        return api;


        function showProductDetails(productId, productProvider) {
            var url = "/api/product/" + productId + "/type/" + productProvider + "/details";
            console.log(url);
            return $http.get(url);

        }
    }

})();