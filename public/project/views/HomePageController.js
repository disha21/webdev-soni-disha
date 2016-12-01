/**
 * Created by dishasoni on 10/10/16.
 */

(function () {
    angular
        .module("webdevProject")
        .controller("HomePageController", HomePageController)


    function HomePageController(HomepageService,$location,$scope, $mdDialog) {
        console.log("in HomePageController");
        var vm = this;
        vm.searchByItem = searchByItem;

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
                    //$location.url("/searchResults");
                }).error(function () {
                    console.log("error in controller");

            });
        }


        $scope.showAdvanced = function(ev,item) {
            $mdDialog.show({
                controller: ModalController,
                templateUrl: 'views/modalContent.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: $scope.customFullscreen,
                scope:$scope
            })
                .then(function(vm) {
                    console.log("in scope");
console.log(vm);


                }, function() {

                });
        };
    }


    function ModalController($scope, $mdDialog) {
console.log("vm"+ $scope.itemList);
        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

    }




})();
