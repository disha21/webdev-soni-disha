/**
 * Created by dishasoni on 10/10/16.
 */



(function() {
    angular.module("webdevProject",["ngRoute"])
        .config(Config);
    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/home/homepage.view.client.html",
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
            .when("/user/:uid/search", {
                templateUrl: "views/home/homepage.view.client.html",
                controller:"HomePageController",
                controllerAs: "model",
                resolve: { checkLoggedin: checkLoggedin }
        })
            .when("/user/:uid/dashboard", {
                templateUrl: "views/home/dashboard.view.client.html",
                controller:"DashboardController",
                controllerAs: "model"
            })

            .when("/user/:uid/adminDashboard", {
                templateUrl: "views/admin/adminDashboard.view.client.html",
                controller:"AdminDashboardController",
                controllerAs: "model"
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

