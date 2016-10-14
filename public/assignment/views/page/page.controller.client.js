/**
 * Created by dishasoni on 10/10/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController)

    function PageListController($routeParams,PageService,$location) {
        var vm = this;
        var wid = $routeParams.wid;
        vm.wid = wid;
        var uid = $routeParams.uid;
        vm.uid =uid;
        vm.edit = edit;
        function init() {
            vm.pages = PageService.findPageByWebsiteId(wid);
        }
        init();

        function edit(pageId){
            console.log("in edit pagelist" + pageId);
            vm.page = PageService.findPageById(pageId);
            if(vm.page){
                $location.url("user/" + uid +"/website/" + wid +"/page/" + pageId);
            }
            console.log(vm.page);
        }


    }
    function NewPageController() {
        var vm = this;

    }
    function EditPageController($routeParams,PageService,$location) {
        var vm = this;
        var uid = $routeParams.uid;
        var wid = $routeParams.wid;
        var pid = $routeParams.pid;
        vm.uid =uid;
        vm.wid=wid;
        vm.pid = pid;
        vm.deletePage = deletePage;
        function init() {
            vm.pages = PageService.findPageByWebsiteId(wid);
            vm.page = PageService.findPageById(pid);
            console.log(vm.page);

        }
        init();

        function deletePage (pageId){
            console.log("In delete" + pageId);
            vm.pages = PageService.deletePage(pageId);
            console.log("In delete" + vm.pages);
            if(vm.pages){
                $location.url("user/" + uid +"/website/" + wid +"/page/");
            }
        }

       

    }


})();
