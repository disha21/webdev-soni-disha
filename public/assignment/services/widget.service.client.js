/**
 * Created by dishasoni on 10/10/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {


        var api = {
            "createWidget"   : createWidget,
            "findWidgetsByPageId" : findWidgetsByPageId,
            "findWidgetById":findWidgetById,
            "updateWidget":updateWidget,
            "deleteWidget":deleteWidget


        };

        return api;

        function createWidget(userId,websiteId, pageId, newWidget)  {
            console.log("user"+ userId+  "website"+ websiteId + pageId);
            return $http.post('/api/user/'+ userId +'/website/'+ websiteId +'/page/'+ pageId + '/widget',newWidget);

        }
        function findWidgetsByPageId(userId,websiteId,pageId) {
            console.log("in widget service" +userId + websiteId + pageId );
            var url = '/api/user/'+ userId + '/website/' + websiteId +'/page/' +pageId + '/widget/' ;
            console.log(url);
            return $http.get(url);


        }
        function findWidgetById(userId,websiteId,pageId,widgetId){
            console.log("In server" + userId + websiteId + pageId + widgetId);
            var url = '/api/user/'+ userId + '/website/' + websiteId +'/page/' + pageId +'/widget/' + widgetId ;
            console.log("Url" + url);
            return $http.get(url);

        }
        function updateWidget(userId,websiteId,pageId, updatedWidget)  {
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

