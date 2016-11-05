/**
 * Created by dishasoni on 10/10/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {

       /* var widgets = [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];*/

       /* var widgets = [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "347", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Loremmmm ipsum</p>"},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "679", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Loremmmm ipsum</p>"}
        ];*/



        var api = {
            "createWidget"   : createWidget,
            "findWidgetsByPageId" : findWidgetsByPageId,
            "findWidgetById":findWidgetById,
            "updateWidget":updateWidget,
            "deleteWidget":deleteWidget

        };

        return api;
        function createWidget(userId,websiteId, pageId, newWidget)  {
           /* var widgetList =[];
            console.log("widgets"+ findWidgetsByPageId(pageId));
            var widgetList = findWidgetsByPageId(pageId);
            console.log("widgetList"+ widgetList);
            for(widget in widgetList){
                   // var lastWidget = widgets[widget.length - 1];
                  //  newWidget._id = lastWidget._id +1;
                   // console.log("Widget id"+ newWidget._id);
                    widgets.push(newWidget);
                    console.log(newWidget);
                    return newWidget;



            }*/

            console.log("user"+userId+  "website"+ websiteId + pageId);

            return $http.post('/api/user/'+ userId +'/website/'+ websiteId +'/page/'+ pageId + '/widget',newWidget);

        }
        function findWidgetsByPageId(userId,websiteId,pageId) {

          /*  var widgetLists =[];
            for (var widget in widgets) {
                if (widgets[widget].pageId === pageId) {
                    widgetLists.push( widgets[widget]);
                }
            }
            return widgetLists;*/

            console.log("in widget service" +userId + websiteId + pageId );
            var url = '/api/user/'+ userId + '/website/' + websiteId +'/page/' +pageId + '/widget/' ;
//console.log(url);
            return $http.get(url);


        }
        function findWidgetById(userId,websiteId,pageId,widgetId){

           /* for (var widget in widgets) {
                if (widgets[widget]._id === widgetId) {
                    return widgets[widget];
                }
            }
            return null;*/

            console.log("In server" + userId + websiteId + pageId + widgetId);
            var url = '/api/user/'+ userId + '/website/' + websiteId +'/page/' + pageId +'/widget/' + widgetId ;
            console.log("Url" + url);
            return $http.get(url);

        }
        function updateWidget(userId,websiteId,pageId, updatedWidget)  {
            /*for (var widget in widgets) {
                if (widgets[widget]._id === widgetId) {
                    return widgets[widget];
                }
            }
            return null;*/

            console.log("in service" +userId + websiteId + pageId + updatedWidget._id );
            var url = '/api/user/'+ userId +'/website/'+ websiteId + '/page/'+pageId +'/widget/'+updatedWidget._id ;
            console.log("in service" + url);

            return $http.put(url,updatedWidget);
        }


        function deleteWidget(userId,websiteId,pageId,widgetId) {
            console.log("in service" +userId +  websiteId + pageId +widgetId);
            var url = '/api/user/'+ userId +'/website/'+ websiteId +'/page/' +pageId +'/widget/' +widgetId;
            return $http.delete(url);


        }


    }
})();

