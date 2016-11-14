/**
 * Created by dishasoni on 10/10/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController)


    function WidgetListController($routeParams, WidgetService,$location,$sce) {
        var vm = this;
       // vm.edit = edit;


        var uid = parseInt($routeParams.uid);
        vm.uid =uid;
        var wid = parseInt($routeParams.wid);
        vm.wid =wid;
        var pid = parseInt($routeParams.pid);
        vm.pid =pid;
        var wgid = parseInt($routeParams.wgid);
        vm.wgid =wgid;
        vm.checkSafeHtml =checkSafeHtml;
        vm.checkSafeYoutubeUrl = checkSafeYoutubeUrl;
        vm.checkSafeImageUrl = checkSafeImageUrl;

        function init() {
            console.log("in init");
            WidgetService.findWidgetsByPageId(uid,wid,pid)
                .success(function (widget) {
                    if (widget != null) {
                        console.log("in success");
                        console.log( "check" );
                        vm.widgets = widget;
                        console.log( vm.widgets);


                    }
                }).error(function () {
                console.log("error in controller");

            });


        }
        init();



       function checkSafeHtml(html) {
           return $sce.trustAsHtml(html);
       }

        function checkSafeYoutubeUrl(youtubeUrl) {
            var urlParts = youtubeUrl.split('/');
            var id =  urlParts[urlParts.length -1];
            youtubeUrl = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(youtubeUrl);
        }

        function checkSafeImageUrl(imageUrl) {

            return $sce.trustAsResourceUrl(imageUrl);
        }
    }

    function NewWidgetController($routeParams, WidgetService,$location) {
        var vm = this;
        var uid = $routeParams.uid;
        var wid = $routeParams.wid;
        var pid = $routeParams.pid;
        vm.uid = uid;
        vm.wid = wid;
        vm.pid = pid;

        vm.addHeader = addHeader;
        vm.addHtml = addHtml;
        vm.addImage = addImage;
        vm.addYoutube = addYoutube;

        function addHeader() {

            var newWidgetHeader = {
                "widgetType": "HEADER",
                "pageId": pid,
                "size": "2",
                "text": "sample"
            };


            var promise = WidgetService.createWidget(uid,wid, pid, newWidgetHeader);
            promise
                .success(function (widgetHeader) {
                    if (widgetHeader) {
                        vm.widget = widgetHeader;
                        $location.url("user/" + uid + "/website/" + wid + "/page/" + pid + "/widget/" + vm.widget._id);
                        // console.log("/user/" + user._id);

                    } else {
                        vm.error = "Widget not created";
                    }
                }).error(function () {

            });

        }

        function addHtml() {

            var newWidgetHtml =
            {  "widgetType": "HTML", "pageId": pid, "text": "<p>Lorem ipsum</p>"};




            var promise = WidgetService.createWidget(uid,wid, pid, newWidgetHtml);
            promise
                .success(function (widgetHtml) {
                    if (widgetHtml) {
                        vm.widget= widgetHtml;
                        $location.url("user/" + uid + "/website/" + wid + "/page/" + pid + "/widget/" + vm.widget._id);
                        // console.log("/user/" + user._id);

                    } else {
                        vm.error = "Widget not created";
                    }
                }).error(function () {

            });

        }

        function addImage() {

            var newWidgetImage =
                {  "widgetType": "IMAGE", "pageId": pid, "width": "100%",
                    "url": "http://lorempixel.com/400/200/"};

            var promise = WidgetService.createWidget(uid,wid, pid, newWidgetImage);
            promise
                .success(function (widgetImage) {
                    if (widgetImage) {
                        vm.widget= widgetImage;
                        $location.url("user/" + uid + "/website/" + wid + "/page/" + pid + "/widget/" +  vm.widget._id);
                        // console.log("/user/" + user._id);

                    } else {
                        vm.error = "Widget not created";
                    }
                }).error(function () {

            });

        }
        function addYoutube() {

            var newYoutube =
                { "widgetType": "YOUTUBE", "pageId": pid, "width": "100%",
                    "url": "https://youtu.be/AM2Ivdi9c4E" };



            var promise = WidgetService.createWidget(uid,wid, pid, newYoutube);
            promise
                .success(function (widgetYoutube) {
                    if (widgetYoutube) {
                        vm.widget= widgetYoutube;
                        $location.url("user/" + uid + "/website/" + wid + "/page/" + pid + "/widget/" +  vm.widget._id);
                        // console.log("/user/" + user._id);

                    } else {
                        vm.error = "Widget not created";
                    }
                }).error(function () {

            });

        }
    }

    function EditWidgetController($routeParams, WidgetService,$location) {
        var vm = this;
        var uid = parseInt($routeParams.uid);
        var wid = parseInt($routeParams.wid);
        var pid = parseInt($routeParams.pid);
        var wgid = parseInt($routeParams.wgid);
        vm.uid = uid;
        vm.wid = wid;
        vm.pid = pid;
        vm.wgid = wgid;
        vm.deleteWidget = deleteWidget;
       // vm.editWidget = editWidget;
        vm.updateWidget = updateWidget;

        function init() {
            WidgetService
                .findWidgetById(uid,wid,pid,wgid)
                .success(function (widget) {
                    console.log("in success of edit");

                    vm.widget = widget;
                    console.log(vm.widget);
                    $location.url("user/" + uid +"/website/" + wid +"/page/" + pid + "/widget/" + wgid);

                }).error(function () {
                console.log("error in controller");

            });

        }
        init();

        function updateWidget(){
            console.log(vm.widget._id);
            WidgetService.updateWidget(uid,wid,pid,vm.widget);
            $location.url("user/" + uid + "/website/" + wid +"/page/" +pid +"/widget/" );

        }

        function deleteWidget() {
            console.log("In delete" + wgid);
            console.log( vm.widget);
            WidgetService
                .deleteWidget(vm.uid, vm.wid,vm.pid,vm.wgid)
                .success(function () {
                    console.log("in success");
                    $location.url("user/" + vm.uid + "/website/" + vm.wid + "/page/" +pid+"/widget/");
                }).error(function () {
                console.log("error in controller");

            });
        }



    }


})();