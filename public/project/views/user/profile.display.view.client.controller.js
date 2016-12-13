/**
 * Created by dishasoni on 12/12/16.
 */


(function () {
    angular
        .module("webdevProject")
        .controller("ProfileDisplayController", ProfileDisplayController)



    function ProfileDisplayController(UserService,ProductService,$location,$routeParams) {
        console.log("ProfileDisplayController");
        var vm = this;
        var uid = $routeParams.uid;
        vm.uid = uid;
        var toViewUser = $routeParams.viewUserName;
        vm.toViewUser = toViewUser;
        vm.follow = follow;
        vm.unfollow = unfollow;


         function init() {
             console.log("in init");


                 UserService.checkLoggedin()
                     .then(function(user){
                         if(user.data!=0){
                             vm.user = user.data;
                         }
                         console.log("getcurrentuser");
                         console.log(user);

                     })




             function logout() {
                 console.log("in logout");
                 UserService.logout()
                     .success(function () {
                         $location.url("/login");
                     }).error(function () {
                     console.log("error in controller");


                 });
             }


             UserService.getUserProfile(uid,toViewUser)
                 .success(function (responseUserModel) {
                     console.log("responseUserModel");
                     console.log(responseUserModel);
                     var d = Date.parse(responseUserModel.member_since);
                     console.log("date" + d);
                     vm.responseUserModel = responseUserModel;

                 }).error(function (err) {
                     console.log(err)
;
             })
         }

         init();

        function follow(){
            console.log("in follow");
            UserService.follow(uid,toViewUser)
                .success(function (status) {
                    console.log("following");
                })
        }

        function unfollow(){
            UserService.unfollow(uid,toViewUser)
                .success(function (status) {
                    console.log("Unfollowing");
                })
        }


    }

})();
