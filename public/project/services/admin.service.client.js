/**
 * Created by dishasoni on 10/10/16.
 */


(function () {
    angular
        .module("webdevProject")
        .factory("AdminpageService", AdminpageService);


    function AdminpageService($http) {


        var api = {
            findAllUsers: findAllUsers,
            findAllTrackedProducts:findAllTrackedProducts

        };

        return api;

     function findAllUsers(userId){

        var url = '/api/user/'+ userId + '/users';
        return $http.get(url);
}

        function findAllTrackedProducts(userId){

            var url = '/api/user/'+ userId + '/products';
            return $http.get(url);
        }





    }
})();

