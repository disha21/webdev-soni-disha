/**
 * Created by dishasoni on 10/10/16.
 */

(function () {
    angular
        .module("webdevProject")
        .controller("HomePageController", HomePageController)



    function HomePageController(HomepageService,UserService, $scope, $mdDialog,$location,ProductService,$anchorScroll) {
        console.log("in HomePageController");
        var vm = this;
        vm.searchByItem = searchByItem;
        vm.startTrackingItemPriceEbay = startTrackingItemPriceEbay;
        vm.startTrackingItemPriceAmazon = startTrackingItemPriceAmazon;
        vm.logout = logout;




        function init(){
            UserService.checkLoggedin()
                .then(function(user){
                    if(user.data!=0){
                        vm.user = user.data;
                    }
                    console.log("getcurrentuser");
                    console.log(user);

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
                               alert("Here's a message");
                               $location.url("/user/" + user._id + "/dashboard")
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

        $scope.status = '  ';
        $scope.customFullscreen = false;

        function searchByItem(itemName) {
            console.log("searchByItem ");
            HomepageService
                .searchItem(itemName)
                .success(function (itemList) {
                    console.log(itemList);
                    vm.itemList = itemList;
                    vm.ebayItems = itemList.ebay;
                    vm.amazonItems = itemList.amazon;
                    $('#searchItems').stop().animate({scrollTop: $("#searchItems")[0].scrollHeight}, 2000);
                }).error(function () {
                console.log("error in controller");

            });
        }



        $scope.ebay = vm.ebayItems;
        console.log("$scope.ebay");
        console.log($scope.ebay);

        $scope.showAdvanced = function (ev, selectedItem) {
            console.log("show called");
            console.log(selectedItem);
            $mdDialog.show({
                controller: ModalController,
                templateUrl: 'views/home/modalContent.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen,
                scope: $scope.$new(),
                resolve: {
                    ebay: function () {
                        console.log("ebay items");
                        console.log(selectedItem);
                        return selectedItem;
                    }
                }

            }).then(function (ret) {
                console.log("Clodingqewqe");
                console.log("ret" +ret);


            }, function () {
                console.log("Closing....");
            });
        };
    }


    function ModalController($scope, $mdDialog, ebay) {

        console.log("vm");
        console.log($scope);
        console.log("ebay");
        console.log(ebay);
        $scope.ebay = ebay;

        $scope.hide = function () {
            console.log("hide called");
            $mdDialog.cancel();

        };

        $scope.cancel = function () {
            console.log("cancel called");
            $mdDialog.hide();

        };
       /* $scope.close = function () {
            console.log("close called");
            $mdDialog.close();

        };*/


    }


})();
