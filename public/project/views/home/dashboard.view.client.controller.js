/**
 * Created by dishasoni on 10/10/16.
 */

(function () {
    angular
        .module("webdevProject")
        .controller("DashboardController", DashboardController)




    function DashboardController(HomepageService,UserService,ProductService,$routeParams,$scope) {
        console.log("in DashboardController");
        var vm = this;
        var uid = $routeParams.uid;
        vm.uid = uid;
        vm.showProductDetails = showProductDetails;


        function showProductDetails(product) {
            $scope.IsVisible = false;
            console.log("in show details");
            console.log(product);
            $scope.product = product;

                //If DIV is visible it will be hidden and vice versa.
                $scope.IsVisible = true;

        }





        function init() {
            ProductService.findProductsTrackedByUser(uid)
                .success(function (user) {
                    if (user.products != null) {
                        console.log("in success");

                        vm.products = user.products ;
                        console.log(vm.products);



                        $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
                        $scope.series = ['Series A', 'Series B'];

                        $scope.data = [
                            [65, 59, 80, 81, 56, 55, 40],
                            [28, 48, 40, 19, 86, 27, 90]
                        ];

                    }
                }).error(function () {
                console.log("error in controller");

            });


        }

        init();





    }






})();

