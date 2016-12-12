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
        var uid = $routeParams.uid;
        vm.uid = uid;
        vm.edit = edit;

        function init() {
            WebsiteService.findWebsitesByUser(uid)
                .success(function (user) {
                    if (user.websites != null) {
                        console.log("in success");

                        vm.websites = user.websites ;
                        console.log(vm.websites);
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
        var uid = ($routeParams.uid);
        vm.uid = uid;
        vm.addWebsite = addWebsite;

        function init() {
            WebsiteService.findWebsitesByUser(uid)
                .success(function (user) {
                    if (user.websites != null) {
                        console.log("in success");

                        vm.websites = user.websites;
                        console.log(vm.websites);
                    }
                }).error(function () {
                console.log("error in controller");

            });
        }

        init();


        function addWebsite(newWebsite) {
            console.log("In add website");
            console.log(newWebsite);

            if (newWebsite) {
                if(newWebsite.name!=null){
                var promise = WebsiteService.createWebsite(uid, newWebsite);
                promise
                    .success(function (website) {
                        if (vm.website) {
                            vm.website = website;
                            $location.url("user/" + uid + "/website/");
                            // console.log("/user/" + user._id);

                        } else {
                            vm.error = "Website not created";
                        }
                    }).error(function () {

                });
            }
            else {
                vm.error = "Please enter the website name";
            }
        }else{
                vm.error = "Please enter the website name";
        }
        }
    }

    function EditWebsiteController($routeParams, WebsiteService, $location) {
        var vm = this;
        var uid = ($routeParams.uid);
        var wid = ($routeParams.wid);
        vm.uid = uid;
        vm.wid = wid;

        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {

            WebsiteService.findWebsitesByUser(uid)
                .success(function (user) {
                    if (user.websites != null) {
                        console.log("in success");

                        vm.websites = user.websites ;
                        console.log(vm.websites);
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
            if (vm.website.name!=null) {
                WebsiteService.updateWebsite(uid, vm.website);
                $location.url("user/" + uid + "/website/");
            }else{
                vm.error = "Website name cannot be blank";
            }


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
