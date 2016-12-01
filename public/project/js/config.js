/**
 * Created by dishasoni on 10/10/16.
 */


(function() {
    angular.module("webdevProject",["ngRoute",'ngMaterial'])
        .config(Config);
    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/homepage.view.client.html",
                controller:"HomePageController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller:"LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller:"RegisterController",
                controllerAs: "model"
            })
            .when("/user/:uid", {
                templateUrl: "views/user/profile.view.client.html",
                controller:"ProfileController",
                controllerAs: "model",
                resolve: { checkLoggedin: checkLoggedin }

            })
            .otherwise({
                redirectTo:"/"
            })

         function checkLoggedin($q,UserService,$location) {
             var deferred = $q.defer();
                UserService.checkLoggedin()
                    .success(function (user) {
                        if(user !='0'){
                            deferred.resolve();
                        }else{
                            deferred.reject();
                            $location.url("/login");
                        }
                    });


            return deferred.promise;
        }


    }
})();

