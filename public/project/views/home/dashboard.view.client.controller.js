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
        vm.showStats = showStats;





        function getUserProfile(toViewUsername) {
           $location.url("/user/" + uid +"/profile/" + toViewUsername);

        }

        function init() {

            $('#prodDetails').hide();
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

            UserService.getUserFollowers(uid)
                .then(function (users) {
                    console.log(users);
                    vm.following = users.data.length;
                    vm.followingUsers = users.data;
                    vm.productsTracking =  vm.products.length;
                })





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

        function showStats(){
            $('#user-data').show();
            $('#user-btn').show();
            $('#prodDetails').hide();

        }



        function showProductDetails(product) {
            $('#user-data').hide();
            $('#user-btn').hide();
            $('#prodDetails').show();


           $scope.IsVisible = false;
            console.log("in show details");
            console.log(product);
            $scope.product = product;

                //If DIV is visible it will be hidden and vice versa.
                $scope.IsVisible = true;

        }


        function addCommentToProduct(productItemId, comment) {

            ProductService.addCommentToProduct(productItemId,uid, comment)
                .success(function (product) {
                    console.log("updated comments");
                    console.log(product);
                    vm.product = product;
                    console.log(vm.product);
                    showProductDetails(product);
                    vm.comment="";
                })



        }

        function stopTrackingProductForUser(productId) {
            console.log("stopTrackingProductForUser" + productId);
            ProductService.stopTrackingProductForUser(vm.uid, productId)
                .success(function (user) {
                    console.log("product deleted");
                    console.log(user);
                    vm.products = user.products;
                     console.log(vm.products);
                   // $('#prodDetails').hide();
                    init();

                }).error(function () {
                console.log("error in controller");
            });
        }






    }






})();

