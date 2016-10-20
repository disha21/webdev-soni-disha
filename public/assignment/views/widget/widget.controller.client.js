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

        function init () {

             vm.widgets = WidgetService.findWidgetsByPageId(pid);

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
                "_id": "10000",
                "widgetType": "HEADER",
                "pageId": pid,
                "size": "2",
                "text": "sample"
            };

            vm.widget = WidgetService.createWidget(pid, newWidgetHeader);
            if (vm.widget) {
                $location.url("user/" + uid + "/website/" + wid + "/page/" + pid + "/widget/" + vm.widget._id);
            }
            console.log(vm.widget);
        }

        function addHtml() {

            var newWidgetHtml =
            { "_id": "10000", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"};


            vm.widget = WidgetService.createWidget(pid, newWidgetHtml);
            if (vm.widget) {
                $location.url("user/" + uid + "/website/" + wid + "/page/" + pid + "/widget/" + vm.widget._id);
            }
            console.log(vm.widget);
        }

        function addImage() {

            var newWidgetImage =
                { "_id": "345000", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                    "url": "http://lorempixel.com/400/200/"};


            vm.widget = WidgetService.createWidget(pid, newWidgetImage);
            if (vm.widget) {
                $location.url("user/" + uid + "/website/" + wid + "/page/" + pid + "/widget/" + vm.widget._id);
            }
            console.log(vm.widget);
        }
        function addYoutube() {

            var newYoutube =
                { "_id": "67800", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                    "url": "https://youtu.be/AM2Ivdi9c4E" };

            vm.widget = WidgetService.createWidget(pid, newYoutube);
            if (vm.widget) {
                $location.url("user/" + uid + "/website/" + wid + "/page/" + pid + "/widget/" + vm.widget._id);
            }
            console.log(vm.widget);
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
        vm.editWidget = editWidget;

        function init() {

            vm.widget = WidgetService.findWidgetById(wgid);

        }
        init();

        function editWidget(widgetId,updatedWidget){
            console.log("in edit widgetedit" + widgetId);
            vm.widget = WidgetService.updateWidget(wgid,updatedWidget);
            if(vm.widget){
                $location.url("user/" + uid +"/website/" + wid + "/page/" + pid + "/widget");
            }
            console.log(vm.widget);
        }

        function deleteWidget (widgetId){
            console.log("In delete" + widgetId);
            vm.widgets = WidgetService.deleteWidget(widgetId);
            console.log("In delete" + vm.widgets);
            if(vm.widgets){
                $location.url("user/" + uid +"/website/" + wid + "/page/" + pid + "/widget");
            }
        }



    }


})();