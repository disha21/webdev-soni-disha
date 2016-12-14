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
            .when("/search/:itemName", {
                templateUrl: "views/home/homepage.view.client.html",
                controller:"HomePageController",
                controllerAs: "model"

            })

            .when("/user/:uid/search", {
                templateUrl: "views/home/homepage.view.client.html",
                controller:"HomePageController",
                controllerAs: "model",
                resolve: { checkLoggedin: checkLoggedin }
            })

            .when("/user/:uid/search/:itemName", {
                templateUrl: "views/home/homepage.view.client.html",
                controller:"HomePageController",
                controllerAs: "model",
                resolve: { checkLoggedin: checkLoggedin }
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
            .when("/user/:uid/profile/:viewUserName", {
                templateUrl: "views/user/profile.display.view.client.html",
                controller:"ProfileDisplayController",
                controllerAs: "model",
                resolve: { checkLoggedin: checkLoggedin }
            })

            .when("/user/search/product/:productId/productProvider/:provider/details", {
                templateUrl: "views/home/product.details.view.client.html",
                controller:"ProductDetailsPageController",
                controllerAs: "model"


            })
            .when("/user/search/product/:productId/productProvider/:provider/details/:productName", {
            templateUrl: "views/home/product.details.view.client.html",
            controller:"ProductDetailsPageController",
            controllerAs: "model"

        })
            .when("/user/:uid/dashboard", {
                templateUrl: "views/home/dashboard.view.client.html",
                controller:"DashboardController",
                controllerAs: "model",
                resolve: { checkLoggedin: checkLoggedin }
            })

            .when("/user/:uid/adminDashboard", {
                templateUrl: "views/admin/adminDashboard.view.client.html",
                controller:"AdminDashboardController",
                controllerAs: "model",
                resolve: { checkLoggedin: checkLoggedin }
            })

            .otherwise({
                redirectTo:"/"
            })

         function checkLoggedin($q,UserService,$location,$rootScope) {
             var deferred = $q.defer();
                UserService.checkLoggedin()
                    .success(function (user) {
                        if(user !='0'){
                            $rootScope.currentUser = user;
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

