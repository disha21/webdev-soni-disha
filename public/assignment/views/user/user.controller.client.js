/**
 * Created by dishasoni on 10/10/16.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController)

    function RegisterController($location,UserService) {
        var vm = this;
        vm.register = function (newUser) {
            var user = UserService.createUser(newUser);
            if(true) {
                $location.url("/user/"+  user._id);
            } else {
                vm.error = "User not created";
            }
        }
    }
    function ProfileController($routeParams,UserService) {
        var vm = this;
         var uid = $routeParams.uid;
        function init() {
            vm.user = UserService.findUserById(uid);
        }
        init();
        function updateUser(newUser){
            UserService.updateUser(uid,newUser);
        }

    }


    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;
        function login (username, password) {
            var user = UserService.findUserByCredentials(username, password);
            if(user) {
                $location.url("/user/"+  user._id);
            } else {
                vm.error = "User not found";
            }
        }
    }


})();
