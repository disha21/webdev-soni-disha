/**
 * Created by dishasoni on 12/4/16.
 */
(function () {
    angular
        .module("webdevProject")
        .factory("ProductService", ProductService);


    function ProductService($http) {


        var api = {
            findProductByProductId: findProductByProductId,
            findProductsTrackedByUser: findProductsTrackedByUser,
            findProductsByUser: findProductsByUser,
            startTrackingItemPrice: startTrackingItemPrice,
            addCommentToProduct: addCommentToProduct,
            stopTrackingProductForUser:stopTrackingProductForUser

        };

        return api;



        function stopTrackingProductForUser(userId,productId){
            var url = '/api/user/' + userId +'/product/' + productId;
            return $http.delete(url);
        }



        function startTrackingItemPrice(userId, itemId, itemPrice, productProvider, pTitle, imageUrl) {

            var product = {
                productId: itemId,
                productProvider: productProvider,
                productDetails: {
                    price: itemPrice

                },
                productTitle: pTitle,
                imageUrl: imageUrl

            };
            var url = "/api/user/" + userId + "/track/" + itemId;
            return $http.post(url, product);
        }




        function findProductsByUser(userId) {
            var url = "/api/user/" + userId + "/search/";
            return $http.get(url);
        }

        function findProductByProductId(userId, itemId) {
            var url = "/api/user/" + userId + "/search/" + itemId;
            console.log(url);
            return $http.get(url);

        }

        function findProductsTrackedByUser(userId) {

            var url = '/api/user/' + userId + '/dashboard';
            return $http.get(url);
        }

        function addCommentToProduct(productItemId, userId, comment){
            console.log("going to add a comment..." + productItemId );
            console.log("going to add a comment..." + comment );
            var url = '/api/user/' + userId + "/product/" + productItemId + "/comments";
            var body = {
                userName : "blah",
                comment : comment
            };
            return $http.post(url, body);
        }


    }
})();

