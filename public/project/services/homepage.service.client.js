

(function() {
    angular
        .module("webdevProject")
        .factory("HomepageService", HomepageService);

    function HomepageService($http) {

        var api = {
            "searchItem"   : searchItem

        };

        return api;


        function searchItem(item) {
            var url="/api/search/"+item;
            console.log(url);
           return $http.get(url);

        }


    }
})();

