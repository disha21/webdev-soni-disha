/**
 * Created by dishasoni on 10/10/16.
 */

(function () {
    angular
        .module("webdevProject")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController)

    function RegisterController($location, UserService, $routeParams) {
        var vm = this;
        var uid = $routeParams.uid;
        vm.register = function (newUser) {
            UserService
                .findUserByUsername(newUser.username)
                .success(function(user) {
                    if (user!="0") {
                        vm.error = "User already exists";
                    } else {
                        UserService
                            .createUser(newUser)
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
                }).error(function() {

            });


        }
    }

    function ProfileController($routeParams, UserService,$location,$rootScope) {
        var vm = this;
        var uid = $rootScope.currentUser._id;
        vm.uid = uid;
        vm.updateUser = updateUser;
        vm.unregisterUser = unregisterUser;
        vm.logout = logout;



        function init() {
          UserService.findUserById(uid)
                .success(function(user){
                    if (user != null) {
                        console.log("in success");
                        console.log(user);
                        vm.user = user;
                    }
                }).error(function(){
                    console.log("id not found");

            });
        }

        init();

        function updateUser() {
            console.log( vm.user);
            UserService.updateUser(vm.user)
                .success(function (status) {
                    $location.url("/user/"+ vm.uid + "/search");
                });
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

        function logout() {
         UserService.logout()
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
            console.log(username + password);
           // var promise = UserService.findUserByCredentials(username, password);
            var promise = UserService.login(username, password);
            console.log(promise);
            promise
                .success(function(user){
                    console.log("User");
                    console.log(user);
                    console.log(user.role);
                if (user === "0") {
                    vm.error = "User not found";
                    console.log("User not found");

                } else if(user.role === "admin"){
                    console.log("admin");
                    $location.url("/user/" + user._id + "/adminDashboard");
                }
                else {

                    $location.url("/user/" + user._id);

                }
            })
                .error(function(nnn){
                    console.log("nnn" +nnn);

                });

        }
    }


})();
