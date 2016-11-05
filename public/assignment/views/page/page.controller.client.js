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
        var wid = parseInt($routeParams.wid);
        vm.wid = wid;
        var uid = parseInt($routeParams.uid);
        vm.uid =uid;
        vm.edit = edit;



        function init() {
            PageService.findPageByWebsiteId(uid,wid)
                .success(function (page) {
                    if (page != null) {
                        console.log("in success");
                        console.log( "chevck" );
                        vm.pages = page;
                            console.log( vm.pages);


                    }
                }).error(function () {
                console.log("error in controller");

            });
        }

        init();

        function edit(pageId){
            console.log("in edit pagelist" +uid+ wid+ pageId  );
          /*  vm.page = PageService.findPageById(pageId);
            if(vm.page){
                $location.url("user/" + uid +"/website/" + wid +"/page/" + pageId);
            }
            console.log(vm.page);*/
            PageService
                .findPageById(uid,wid,pageId)
                .success(function (page) {
                    console.log("in success");
                    console.log(page);
                    vm.page = page;
                    $location.url("user/" + uid +"/website/" + wid +"/page/" + pageId);

                }).error(function () {
                console.log("error in controller");

            });
        }


    }
    function NewPageController($routeParams,PageService,$location) {
        var vm = this;
        var uid = parseInt($routeParams.uid);
        vm.uid = uid;
        var wid = parseInt($routeParams.wid);
        vm.wid = wid;

        vm.addPage = addPage;
        function addPage(newPage) {
            console.log("In add page" + newPage);

            var promise = PageService.createPage(uid,wid ,newPage);
            promise
                .success(function (page) {
                    if (page) {
                        vm.page = page;
                        $location.url("user/" + uid + "/website/" + wid +"/page/");
                        // console.log("/user/" + user._id);

                    } else {
                        vm.error = "Page not created";
                    }
                }).error(function () {

            });
        }
    }


    function EditPageController($routeParams,PageService,$location) {
        var vm = this;
        var uid = parseInt($routeParams.uid);
        var wid = parseInt($routeParams.wid);
        var pid = parseInt($routeParams.pid);
        vm.uid =uid;
        vm.wid=wid;
        vm.pid = pid;
        vm.deletePage = deletePage;
        vm.updatePage = updatePage;

        function init() {
            PageService
                .findPageById(uid,wid,pid)
                .success(function (page) {
                    console.log("in success");
                    console.log(page);
                    vm.page = page;
                    $location.url("user/" + uid +"/website/" + wid +"/page/" + pid);

                }).error(function () {
                console.log("error in controller");

            });

        }
        init();
        function deletePage() {
            console.log("In delete" + pid);
                console.log( vm.website);
            PageService
                .deletePage(vm.uid, vm.wid,vm.pid)
                .success(function () {
                    console.log("in success");
                    $location.url("user/" + vm.uid + "/website/" + vm.wid + "/page/");
                }).error(function () {
                console.log("error in controller");

            });
        }


        function updatePage(newPage){
            console.log(vm.page);
            console.log(uid);
            PageService.updatePage(uid,wid,vm.page);
            $location.url("user/" + uid + "/website/" + wid +"/page" );

        }
    }


})();
