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
            findProductsTrackedByUser:findProductsTrackedByUser,
            findProductsByUser:findProductsByUser,
            addUserandProduct:addUserandProduct,
            startTrackingItemPrice:startTrackingItemPrice

        };

        return api;


        function startTrackingItemPrice(userId,itemId,itemPrice, productProvider, pTitle,imageUrl){

            var product = {
                productId:itemId,
                productProvider:productProvider,
                productDetails : {
                    price : itemPrice

                },
                productTitle:  pTitle,
                imageUrl :imageUrl

            };
            var url="/api/user/"+ userId +"/track/" +itemId ;
            return $http.post(url,product);
        }


    function addUserandProduct(userId,productId){
    console.log("addUserandProduct");

    var url="/api/user/"+ userId +"/search/" +productId ;
    return $http.get(url);


}
        function findProductsByUser(userId) {

            var url="/api/user/"+ userId +"/search/" ;
            return $http.get(url);


        }

        function findProductByProductId(userId,itemId) {
            var url="/api/user/"+ userId +"/search/" + itemId;
            console.log(url);
            return $http.get(url);

        }

        function findProductsTrackedByUser(userId) {

            var url = '/api/user/'+ userId + '/dashboard';
            return $http.get(url);


        }



    }
})();

