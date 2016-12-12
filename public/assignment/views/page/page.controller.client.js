/**
 * Created by dishasoni on 10/10/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController)

    function PageListController($routeParams, PageService, $location) {
        var vm = this;
        var wid = $routeParams.wid;
        vm.wid = wid;
        var uid = $routeParams.uid;
        vm.uid = uid;
        vm.edit = edit;


        function init() {
            PageService.findPageByWebsiteId(uid, wid)
                .success(function (website) {
                    if (website.pages != null) {
                        console.log("in success");
                        console.log("chevck");
                        vm.pages = website.pages;
                        console.log(vm.pages);


                    }
                }).error(function () {
                console.log("error in controller");

            });
        }

        init();

        function edit(pageId) {
            console.log("in edit pagelist" + uid + wid + pageId);

            PageService
                .findPageById(uid, wid, pageId)
                .success(function (page) {
                    console.log("in success");
                    console.log(page);
                    vm.page = page;
                    $location.url("user/" + uid + "/website/" + wid + "/page/" + pageId);

                }).error(function () {
                console.log("error in controller");

            });
        }


    }

    function NewPageController($routeParams, PageService, $location) {
        var vm = this;
        var uid = $routeParams.uid;
        vm.uid = uid;
        var wid = $routeParams.wid;
        vm.wid = wid;

        vm.addPage = addPage;
        function addPage(newPage) {
            console.log("In add page" + newPage);
            console.log(uid + ":" + wid);
            if (newPage) {
                if (newPage.name != null) {
                    var promise = PageService.createPage(uid, wid, newPage);
                    promise
                        .success(function (page) {
                            if (vm.page) {
                                console.log("In add page success" + page);
                                console.log(page);
                                vm.page = page;
                                $location.url("user/" + uid + "/website/" + wid + "/page/");
                                // console.log("/user/" + user._id);

                            } else {
                                vm.error = "Page not created";
                            }
                        }).error(function () {

                    });
                } else {
                    vm.error = "Page name cannot be blank";
                }
            } else {
                vm.error = "Page name cannot be blank";
            }
        }
    }


    function EditPageController($routeParams, PageService, $location) {
        var vm = this;
        var uid = $routeParams.uid;
        var wid = $routeParams.wid;
        var pid = $routeParams.pid;
        vm.uid = uid;
        vm.wid = wid;
        vm.pid = pid;
        vm.deletePage = deletePage;
        vm.updatePage = updatePage;

        function init() {
            PageService
                .findPageById(uid, wid, pid)
                .success(function (page) {
                    console.log("in success");
                    console.log(page);
                    vm.page = page;
                    $location.url("user/" + uid + "/website/" + wid + "/page/" + pid);

                }).error(function () {
                console.log("error in controller");

            });

        }

        init();
        function deletePage() {
            console.log("In delete" + pid);
            console.log(vm.website);
            PageService
                .deletePage(vm.uid, vm.wid, vm.pid)
                .success(function () {
                    console.log("in success");
                    $location.url("user/" + vm.uid + "/website/" + vm.wid + "/page/");
                }).error(function () {
                console.log("error in controller");

            });
        }


        function updatePage(newPage) {
            console.log(vm.page);
            console.log(uid);
            if (vm.page.name != null) {
                PageService.updatePage(uid, wid, vm.page);
                $location.url("user/" + uid + "/website/" + wid + "/page");
            } else {
                vm.error = "Please fill the page name field"
            }


        }
    }


})();
