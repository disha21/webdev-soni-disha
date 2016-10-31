/**
 * Created by dishasoni on 10/10/16.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController)

    function RegisterController($location, UserService, $routeParams) {
        var vm = this;
        var uid = $routeParams.uid;
        vm.register = function (newUser) {
            var promise = UserService.createUser(newUser);
            promise
                .success(function(user) {
                    if (user) {
                        $location.url("/user/" + user._id);
                        console.log("/user/" + user._id);
                    } else {
                        vm.error = "User not created";
                    }
                }).error(function() {

            });
        }
    }

    function ProfileController($routeParams, UserService,$location) {
        var vm = this;
        var uid = $routeParams.uid;
        vm.uid = uid;
        vm.updateUser = updateUser;
        vm.unregisterUser = unregisterUser;


        function init() {
          UserService.findUserById(uid)
                .success(function(user){
                    if (user != null) {
                        console.log("in success");
                        console.log(user);
                        vm.user = user;
                    }
                }).error(function(){
                    console.log("error in controller");

            });
        }

        init();

        function updateUser() {
            console.log( vm.user);
            UserService.updateUser(vm.user);
            console.log("in update");
            console.log(vm.user);

        }

        function unregisterUser() {
            UserService
                .deleteUser(vm.user._id)
                .success(function(){
                    $location.url("/login");
                }).error(function(){
                console.log("error in controller");

            });

        }

    }


    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(username, password) {
            console.log("in login");
            var promise = UserService.findUserByCredentials(username, password);
            console.log(promise);
            promise
                .success(function(user){
                    console.log("User"+ user);
                if (user == null) {
                    vm.error = "User not found";

                } else {
                    $location.url("/user/" + user._id);
                }
            })
                .error(function(nnn){
                    console.log("nnn" +nnn);

                });

        }
    }


})();
