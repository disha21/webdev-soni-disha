/**
 * Created by dishasoni on 10/10/16.
 */

(function () {
    angular
        .module("webdevProject")
        .controller("ProductDetailsPageController", ProductDetailsPageController)


        function ProductDetailsPageController(ProductDetailsPageService,$location,$routeParams,UserService) {
            var vm = this;
           vm.uid = $routeParams.uid;
            var productId = $routeParams.productId;
            vm.productId =productId;
            var productProvider = $routeParams.provider;
            vm.productProvider =productProvider;
            vm.productName = $routeParams.productName;

            function init() {


                console.log("product details ");
                ProductDetailsPageService
                    .showProductDetails(productId, productProvider)
                    .success(function (product) {
                        console.log("product");
                        console.log(product);
                        vm.product = product;

                    }).error(function () {
                    console.log("product not found");

                });

        }
        init();
    }

})();