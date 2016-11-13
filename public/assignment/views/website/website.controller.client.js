/**
 * Created by dishasoni on 10/10/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController)


    function WebsiteListController($routeParams, WebsiteService,$location) {
        var vm = this;
        var uid = $routeParams.uid;
        vm.uid =uid;
        vm.edit = edit;

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(uid);
        }

        init();

        function edit(websiteId){
            console.log("in edit websitelist" + websiteId);
            vm.website = WebsiteService.findWebsiteById(websiteId);
            if(vm.website){
                $location.url("user/" + uid +"/website/" + websiteId);
            }
            console.log(vm.website);
        }


    }

    function NewWebsiteController(WebsiteService,$routeParams,$location) {
        var vm = this;
        var uid = $routeParams.uid;
        vm.uid = uid;
        vm.addWebsite = addWebsite;

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(uid);


        }
        init();

        function addWebsite(newWebsite){
            console.log("In add website" + newWebsite);
            vm.website = WebsiteService.createWebsite(uid,newWebsite);
            if(vm.website)
                $location.url("user/" + uid +"/website/");
            console.log(vm.website);
        }



    }
    function EditWebsiteController($routeParams, WebsiteService,$location) {
        var vm = this;
        var uid = $routeParams.uid;
        var wid = $routeParams.wid;
        vm.uid = uid;
        vm.wid = wid;

        vm.edit = edit;
        vm.deleteWebsite = deleteWebsite;
        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(uid);
            vm.website = WebsiteService.findWebsiteById(wid);

        }
        init();
        function edit(websiteId){
            console.log("in edit websiteedit" + websiteId);
            vm.website = WebsiteService.findWebsiteById(websiteId);
            if(vm.website){
                $location.url("user/" + uid +"/website/" + websiteId);
            }
            console.log(vm.website);
        }

        function deleteWebsite (websiteId){
            console.log("In delete" + websiteId);
            vm.websites = WebsiteService.deleteWebsite(websiteId);
            console.log("In delete" + vm.websites);
            if(vm.websites){
                $location.url("user/" + uid +"/website/");
            }
        }

        function updateWebsite(newWebsite){
            console.log("in update");
            WebsiteService.updateWebsite(wid, newWebsite);


        }


    }


})();
