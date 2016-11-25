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
        var uid = $routeParams.uid;
        vm.uid =uid;
        var wid = $routeParams.wid;
        vm.wid =wid;
        var pid = $routeParams.pid;
        vm.pid =pid;
        var wgid = $routeParams.wgid;
        vm.wgid =wgid;
        vm.checkSafeHtml =checkSafeHtml;
        vm.checkSafeYoutubeUrl = checkSafeYoutubeUrl;
        vm.checkSafeImageUrl = checkSafeImageUrl;

        function init() {
            console.log("in init");
            WidgetService.findWidgetsByPageId(uid,wid,pid)
                .success(function (page) {
                    console.log("page");
                    console.log(page);
                  //  if (page.widgets != null) {
                        console.log("in success");
                        console.log( "check" );
                        console.log( page.widgets);
                        vm.widgets = page.widgets;



                  //  }
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
        vm.addTextInput = addTextInput;


        function addTextInput() {

            var newTextInput= {
                "widgetType": "INPUT",
                "pageId": pid

            };


            var promise = WidgetService.createWidget(uid,wid, pid, newTextInput);
            promise
                .success(function (widget) {
                    console.log("In add widget success" + widget);

                    console.log("in success");

                    console.log("widget ID:" + widget._id);
                    vm.widget = widget;
                    $location.url("user/" + uid + "/website/" + wid + "/page/" + pid + "/widget/" + vm.widget._id);
                    // console.log("/user/" + user._id);
                }).error(function () {

            });

        }


        function addHeader() {

            var newWidgetHeader = {
                "widgetType": "HEADER",
                "pageId": pid,
                "size": "2",
                "text": "sample"
            };


            var promise = WidgetService.createWidget(uid,wid, pid, newWidgetHeader);
            promise
                .success(function (widget) {
                    console.log("In add widget success" + widget);

                        console.log("in success");

                        console.log("widget ID:" + widget._id);
                        vm.widget = widget;
                        $location.url("user/" + uid + "/website/" + wid + "/page/" + pid + "/widget/" + vm.widget._id);
                        // console.log("/user/" + user._id);
                }).error(function () {

            });

        }

        function addHtml() {

            var newWidgetHtml =
            {  "widgetType": "HTML", "pageId": pid, "text": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."};


            var promise = WidgetService.createWidget(uid,wid, pid, newWidgetHtml);
            promise
                .success(function (widgetHtml) {
                    if (widgetHtml) {
                        vm.widget= widgetHtml;
                        $location.url("user/" + uid + "/website/" + wid + "/page/" + pid + "/widget/" + vm.widget._id);

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
        var uid = $routeParams.uid;
        var wid = $routeParams.wid;
        var pid = $routeParams.pid;
        var wgid = $routeParams.wgid;
        vm.uid = uid;
        vm.wid = wid;
        vm.pid = pid;
        vm.wgid = wgid;
        vm.deleteWidget = deleteWidget;
        vm.updateWidget = updateWidget;
        console.log("widget id: " + vm.wgid);

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