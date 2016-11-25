/**
 * Created by dishasoni on 10/10/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http) {
        var api = {
            "createPage"   : createPage,
            "findPageByWebsiteId" : findPageByWebsiteId,
            "findPageById":findPageById,
            "updatePage":updatePage,
            "deletePage":deletePage

        };

        return api;
        function createPage(userId,websiteId, newPage)  {
            var page = {
                name:newPage.name,
                title:newPage.title,
                websiteId: websiteId
            };

            console.log("user"+userId+  "website"+ websiteId);

            return $http.post('/api/user/'+ userId +'/website/' + websiteId +'/page',page);

        }
        function findPageByWebsiteId(userId ,websiteId) {
           /* var pageLists =[];
            for (var page in pages) {
                if (pages[page].websiteId === websiteId) {
                    pageLists.push(pages[page]);
                }

            }
            return pageLists;*/


            var url = '/api/user/'+ userId + '/website/' + websiteId +'/page' ;
            return $http.get(url);

        }
        function findPageById(userId, websiteId ,pageId){
          /*  for (var page in pages) {
                if (pages[page]._id === pageId) {
                    return pages[page];
                }
            }
            return null;*/
            console.log("In server" + userId + websiteId + pageId);
            var url = '/api/user/'+ userId + '/website/' + websiteId +"/page/" +pageId ;
            return $http.get(url);
        }

        function updatePage(userId,websiteId, updatedPage)   {
         /*   for (var page in pages) {
                if (pages[page]._id === pageId) {
                    pages[page].name = page.name;
                    return true;
                }
            }
            return false;*/

            console.log("in service" +userId + websiteId + updatedPage._id);
            var url = '/api/user/'+ userId +'/website/'+ websiteId + '/page/'+updatedPage._id;
            console.log("in service" + url);

            return $http.put(url,updatedPage);

        }
        function deletePage(userId,websiteId,pageId) {
            /*for (var page in pages) {
                if (pages[page]._id === pageId) {
                    pages.splice(page, 1);
                    return pages;


                }
            }*/

            console.log("in service" +userId +  websiteId + pageId);
            var url = '/api/user/'+ userId +'/website/'+ websiteId +'/page/' +pageId;
            return $http.delete(url);


        }


    }
})();

