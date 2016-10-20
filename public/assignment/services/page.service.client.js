/**
 * Created by dishasoni on 10/10/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456" },
            { "_id": "432", "name": "Post 2", "websiteId": "456" },
            { "_id": "543", "name": "Post 3", "websiteId": "456" },
            { "_id": "549", "name": "Post 4", "websiteId": "123" }
        ];


        var api = {
            "createPage"   : createPage,
            "findPageByWebsiteId" : findPageByWebsiteId,
            "findPageById":findPageById,
            "updatePage":updatePage,
            "deletePage":deletePage

        };

        return api;
        function createPage(websiteId, newPage)  {

            var pageList =[];
            console.log("pages"+ findPageByWebsiteId(websiteId));
            var pageList = findPageByWebsiteId(websiteId);
            console.log("pageList"+ pageList);
            for(page in pageList){
                if (page.name!== newPage.name) {
                    var lastPage = pages[pages.length - 1];
                    var page_id = lastPage._id +1;
                    console.log(lastPage._id);
                    var newPageObject =  {_id: page_id,
                        name: newPage.name ,
                        websiteId:websiteId
                    };
                    console.log(newPageObject);
                    pages.push(newPageObject);
                    console.log(pages);
                    return newPageObject;
                }else{
                    return null;
                }
            }


        }
        function findPageByWebsiteId(websiteId) {
            var pageLists =[];
            for (var page in pages) {
                if (pages[page].websiteId === websiteId) {
                    pageLists.push(pages[page]);
                }

            }
            return pageLists;

        }
        function findPageById(pageId){
            for (var page in pages) {
                if (pages[page]._id === pageId) {
                    return pages[page];
                }
            }
            return null;
        }
        function updatePage(pageId, page)   {
            for (var page in pages) {
                if (pages[page]._id === pageId) {
                    pages[page].name = page.name;
                    return true;
                }
            }
            return false;

        }
        function deletePage(pageId) {
            for (var page in pages) {
                if (pages[page]._id === pageId) {
                    pages.splice(page, 1);
                    return pages;


                }
            }
        }


    }
})();

