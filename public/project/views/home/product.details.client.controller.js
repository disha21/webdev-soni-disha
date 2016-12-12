/**
 * Created by dishasoni on 10/10/16.
 */

(function () {
    angular
        .module("webdevProject")
        .controller("ProductDetailsPageController", ProductDetailsPageController)


        function ProductDetailsPageController(ProductDetailsPageService,$location,$routeParams) {
            var vm = this;

            var productId = $routeParams.productId;
            vm.productId =productId;
            var productProvider = $routeParams.provider;
            vm.productProvider =productProvider;

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