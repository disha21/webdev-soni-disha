/**
 * Created by dishasoni on 10/10/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {

        var widgets = [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];



        var api = {
            "createWebsite"   : "createWebsite",
            "findWebsitesByUser" : "findWebsitesByUser",
            "findWebsiteById":"findWebsiteById",
            "updateWebsite":"updateWebsite",
            "deleteWebsite":"deleteWebsite"

        };

        return api;
        function createWidget(pageId, widget)  {

        }
        function findWidgetsByPageId(pageId) {

        }
        function findWidgetById(widgetId){

        }
        function updateWidget(widgetId, widget)  {

        }
        function deleteWidget(widgetId) {

        }


    }
})();
