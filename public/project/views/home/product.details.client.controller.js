/**
 * Created by dishasoni on 10/10/16.
 */

(function () {
    angular
        .module("webdevProject")
        .controller("ProductDetailsPageController", ProductDetailsPageController)


        function ProductDetailsPageController(ProductDetailsPageService,$location,$routeParams,UserService,ProductService) {
            var vm = this;
            vm.uid = $routeParams.uid;
            var productId = $routeParams.productId;
            vm.productId =productId;
            var productProvider = $routeParams.provider;
            vm.productProvider =productProvider;
            vm.productName = $routeParams.productName;
            vm.startTrackingItemPriceEbay =startTrackingItemPriceEbay;
            vm.startTrackingItemPriceAmazon = startTrackingItemPriceAmazon;

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


            function startTrackingItemPriceEbay(itemId, itemPrice,pTitle,imageUrl) {
                console.log("startTrackingItemPriceEbay");
                var productProvider = "ebay";
                console.log(productProvider);
                startTrackingItemPrice(itemId, itemPrice, productProvider,pTitle,imageUrl);
            }

            function startTrackingItemPriceAmazon(itemId, itemPrice,pTitle,imageUrl) {
                console.log("Amazon title " + pTitle);
                var productProvider = "amazon";
                console.log(productProvider);
                startTrackingItemPrice(itemId, itemPrice,productProvider,pTitle,imageUrl)
            }

            function startTrackingItemPrice(itemId, itemPrice,productProvider,pTitle,imageUrl) {

                console.log("In startTrackingItemPrice");
                console.log(productProvider);
                console.log("startTrackingItemPrice" +itemId + itemPrice  + productProvider + pTitle +imageUrl );

                UserService.checkLoggedin()
                    .success(function (user) {
                        if(user!=0){
                            console.log("user id");
                            console.log(user._id);

                            ProductService.startTrackingItemPrice(user._id, itemId, itemPrice, productProvider, pTitle,imageUrl)
                                .success(function (msg) {
                                    vm.success = msg.msg;
                                    console.log("user._id");
                                    console.log(user._id);
                                    swal({
                                            title: "Congrats!!",
                                            text: "You are now tracking this product. Click here to go to your dashboard",
                                            type: "success",
                                            showCancelButton: true,
                                            confirmButtonColor: "#28A828",
                                            confirmButtonText: "Go to dashboard",
                                            cancelButtonText: "Stay on this page",
                                            closeOnConfirm: true,
                                            closeOnCancel: true
                                        },
                                        function(isConfirm){
                                            if (isConfirm) {
                                                window.location = "#/user/" + user._id + "/dashboard";
                                                //   $location.url("/user/" + user._id + "/dashboard" )
                                            } else {

                                            }
                                        });

                                }).error(function (error) {
                                console.log(error);
                            });

                        }else{

                            console.log("Please log in to track your product");
                            $location.url("/login");

                        }
                    }).error(function (error) {

                });

                /**/

            }
    }

})();