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
        vm.register = register;


        function register (username,password,verifyPassword) {
                console.log("in register");
            var newUser = {
                username:username,
                password: password
            };
                console.log(username + password+ verifyPassword);

                if(username && password && verifyPassword)
                {
                    console.log("in first if");
                    if(password === verifyPassword)
                    {
                        console.log("in second if");
            UserService
                .findUserByUsername(username)
                .success(function(user) {
                    console.log("user");
                    console.log(user);
                    if (user!="0") {
                        vm.error = "User already exists";
                        console.log("user");
                    } else {
                        console.log("user in else") ;
                        UserService
                            .register(newUser)
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
console.log("eeee");
            });
        } else {
                       vm.error = "Password do not match!!!";
                        vm.perror= "Please make sure password and verify password are both same";
                    }
                }
                else {
                    vm.error = "Please fill required fields!!";
                }
            }
    }

    function ProfileController($routeParams, $rootScope,UserService,$location) {
        var vm = this;
        var uid = $rootScope.currentUser._id;
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
                    console.log("id not found");

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
            if (username && password) {
                console.log("username:" + username + "passowrd:" + password );
                var promise = UserService.login(username, password);
                console.log(promise);
                promise
                    .success(function (user) {
                        console.log("User");
                        console.log(user);
                        if (user == "0") {
                            vm.error = "User not found";
                            console.log("User not found");

                        } else {
                            console.log("logged in");
                            $location.url("/user/" + user._id);

                        }
                    })
                    .error(function (nnn) {
                        console.log("nnn" + nnn);

                    });

            }else{
                vm.error ="Please enter username and password!!";
        }

        }
    }


})();
