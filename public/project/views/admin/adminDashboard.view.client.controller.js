
/**
 * Created by dishasoni on 10/10/16.
 */

(function () {
    angular
        .module("webdevProject")
        .controller("AdminDashboardController", AdminDashboardController)




    function AdminDashboardController(AdminpageService,$routeParams,UserService,$location) {
        console.log("in AdminDashboardController");
        var vm = this;
        var uid = $routeParams.uid;
        vm.uid = uid;
        vm.findAllUsers =findAllUsers;
        vm.deleteUser =deleteUser;
        vm.updateUser =updateUser;
        vm.findAllTrackedProducts = findAllTrackedProducts;
        vm.logout = logout;

        function init(){
            UserService.checkLoggedin()
                .then(function(user){
                    if(user.data!=0){
                        vm.user = user.data;
                    }
                    console.log("getcurrentuser");
                    console.log(user);

                })
        }
        init();


        function logout() {
            console.log("in logout");
            UserService.logout()
                .success(function () {
                    $location.url("/login");
                }).error(function () {
                console.log("error in controller");


            });
        }


        function deleteUser(userId){
            console.log("in admin delete");
            console.log(userId);
            UserService
                .deleteUser(userId)
                .success(function(){
                    console.log("User deleted");
                }).error(function(){
                console.log("error in controller");


            });
        }

        function updateUser(user) {
            console.log( user);
            UserService.updateUser(user);
            console.log("in update");
            console.log(user);

        }

        function findAllUsers() {
            console.log("in AdminDashboardController :findAllUsers");
            AdminpageService.findAllUsers(uid)
                .success(function (users) {
                    if (users!= null) {
                        $('#usersTable').show();
                        $('#productsTable').hide();
                        console.log("in success");
                        vm.users = users ;

                        console.log(vm.users);
                    }
                }).error(function () {
                console.log("error in controller");

            });
        }


        function findAllTrackedProducts() {
            console.log("in AdminDashboardController :findAllUsers");
            AdminpageService.findAllTrackedProducts(uid)
                .success(function (products) {
                    if (products!= null) {
                        $('#usersTable').hide();
                        $('#productsTable').show();
                        console.log("in success");
                        vm.products = products ;
                        console.log(vm.products);
                    }
                }).error(function () {
                console.log("error in controller");

            });
        }








    }






})();

