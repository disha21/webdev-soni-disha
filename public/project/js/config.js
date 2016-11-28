/**
 * Created by dishasoni on 10/10/16.
 */


(function() {
    angular.module("webdevProject",["ngRoute"])
        .config(Config);
    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "homepage.view.client.html",
                controller:"HomePageController",
                controllerAs: "model"
            })


            .otherwise({
                redirectTo:"/"
            })

    }
})();

