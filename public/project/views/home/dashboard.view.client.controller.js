/**
 * Created by dishasoni on 10/10/16.
 */

(function () {
    angular
        .module("webdevProject")
        .controller("DashboardController", DashboardController)




    function DashboardController(HomepageService,UserService,ProductService,$routeParams,$scope,$location) {
        console.log("in DashboardController");
        var vm = this;
        var uid = $routeParams.uid;
        vm.uid = uid;
        vm.showProductDetails = showProductDetails;
        vm.addCommentToProduct = addCommentToProduct;
        vm.stopTrackingProductForUser = stopTrackingProductForUser;
        vm.getUserProfile = getUserProfile;

        function getUserProfile(toViewUsername) {
           $location.url("/user/" + uid +"/profile/" + toViewUsername);

        }

        function init() {
            UserService.checkLoggedin()
                .then(function (user) {
                    if (user.data != 0) {
                        vm.user = user.data;
                    }
                    console.log("getcurrentuser");
                    console.log(user);

                });

            ProductService.findProductsTrackedByUser(uid)
                .success(function (user) {
                    console.log("gyjhgbkuhi");
                    if (user.products != null) {
                        console.log("in success");

                        vm.products = user.products;
                        console.log(vm.products);


                    }
                }).error(function () {
                    console.log("error in controller");

                });



        }
        init();


        function logout() {
            console.log("in logout");
            UserService.logout()
                .success(function () {
                    $location.url("/login");
                }).error(function () {
                console.log("error in controller");


            });
        }


        init();



        function showProductDetails(product) {
            $scope.IsVisible = false;
            console.log("in show details");
            console.log(product);
            $scope.product = product;

                //If DIV is visible it will be hidden and vice versa.
                $scope.IsVisible = true;

        }


        function addCommentToProduct(productItemId, comment) {

            ProductService.addCommentToProduct(productItemId,uid, comment)
                .success(function (comments) {
                    console.log("updated comments");
                    console.log(product);
                    vm.product = product;
                    console.log(product);
                    alert("Your comment has been added");
                   init();
                })



        }

        function stopTrackingProductForUser(productId) {
            console.log("stopTrackingProductForUser" + productId);
            ProductService.stopTrackingProductForUser(vm.uid, productId)
                .success(function () {
                    console.log("product deleted")
                }).error(function () {
                console.log("error in controller");
            });
        }






    }






})();

