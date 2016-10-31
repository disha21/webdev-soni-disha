/**
 * Created by dishasoni on 10/10/16.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController)


    function WebsiteListController($routeParams, WebsiteService, $location) {
        var vm = this;
        var uid = parseInt($routeParams.uid);
        vm.uid = uid;
        vm.edit = edit;

        function init() {
            WebsiteService.findWebsitesByUser(uid)
                .success(function (website) {
                    if (website != null) {
                        console.log("in success");
                        console.log(website);
                        vm.websites = website;
                    }
                }).error(function () {
                console.log("error in controller");

            });
        }

        init();


        function edit(websiteId) {
            console.log("in edit websitelist" + websiteId);
            WebsiteService
                .findWebsiteById(uid,websiteId)
                .success(function (website) {
                        console.log("in success");
                        console.log(website);
                        vm.website = website;
                       $location.url("/user/" + uid + "/website/" + websiteId);

                }).error(function () {
                console.log("error in controller");

            });


        }



    }

    function NewWebsiteController(WebsiteService, $routeParams, $location) {
        var vm = this;
        var uid = parseInt($routeParams.uid);
        vm.uid = uid;
        vm.addWebsite = addWebsite;

        function init() {
            WebsiteService.findWebsitesByUser(uid)
                .success(function (website) {
                    if (website != null) {
                        console.log("in success");
                        console.log(website);
                        vm.websites = website;
                    }
                }).error(function () {
                console.log("error in controller");



            });
        }


        init();



        function addWebsite(newWebsite) {
            console.log("In add website" + newWebsite);

            var promise = WebsiteService.createWebsite(uid, newWebsite);
            promise
                .success(function (website) {
                    if (website) {
                        vm.website = website;
                        $location.url("user/" + uid + "/website/");
                        // console.log("/user/" + user._id);

                    } else {
                        vm.error = "Website not created";
                    }
                }).error(function () {

            });
        }
    }

    function EditWebsiteController($routeParams, WebsiteService, $location) {
        var vm = this;
        var uid = parseInt($routeParams.uid);
        var wid = parseInt($routeParams.wid);
        vm.uid = uid;
        vm.wid = wid;

        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {

            WebsiteService
                .findWebsitesByUser(uid)
                .success(function (website) {
                    if (website != null) {
                        console.log("in success");
                        console.log(website);
                        vm.websites = website;
                    }
                }).error(function () {
                console.log("error in controller");
            });


            WebsiteService
                .findWebsiteById(uid,wid)
                .success(function (website) {
                    console.log("in success");
                    console.log(website);
                    vm.website = website;

                }).error(function () {
                console.log("error in controller");

            });


        }

        init();
        function updateWebsite() {
            console.log("in update website " + wid);
            console.log(vm.website);
            console.log(uid);
              WebsiteService.updateWebsite(uid,vm.website);
               $location.url("user/" + uid + "/website/");
          /* .success(function () {
               console.log("in update website ");
               console.log(vm.website);
               $location.url("user/" + uid + "/website/");

            }).error(function () {

            });*/




        }

        function deleteWebsite() {
            console.log("In delete" + wid);
            vm.websites =
            console.log( vm.website);
            WebsiteService
                .deleteWebsite(vm.uid, vm.wid)
                .success(function () {
                        console.log("in success");
                    $location.url("user/" + vm.uid + "/website/");
                    }).error(function () {
                        console.log("error in controller");

                });
        }




    }


})();
