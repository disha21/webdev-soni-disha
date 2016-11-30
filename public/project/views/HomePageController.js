/**
 * Created by dishasoni on 10/10/16.
 */
(function () {
    angular
        .module("webdevProject")
        .controller("HomePageController", HomePageController)


    function HomePageController(HomepageService,$location) {
        console.log("in HomePageController");
        var vm = this;
        vm.searchByItem = searchByItem;

        function searchByItem(itemName) {
            console.log("searchByItem ");
            HomepageService
                .searchItem(itemName)
                .success(function (itemList) {
                    console.log(itemList);
                    vm.itemList = itemList;
                    $location.url("/searchResults");
                }).error(function () {
                    console.log("error in controller");

            });
        }
    }

})();
