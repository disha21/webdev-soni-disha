/**
 * Created by dishasoni on 10/10/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService() {
        var websites = [
                        { "_id": "123", "name": "Facebook",    "developerId": "456" },
                        { "_id": "234", "name": "Tweeter",     "developerId": "456" },
                        { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
                        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
                        { "_id": "678", "name": "Checkers",    "developerId": "123" },
                        { "_id": "789", "name": "Chess",       "developerId": "234" },


        ];

        var api = {
            "createWebsite"   : createWebsite,
            "findWebsitesByUser" : findWebsitesByUser,
            "findWebsiteById":findWebsiteById,
            "updateWebsite":updateWebsite,
            "deleteWebsite":deleteWebsite

        };

        return api;
        function createWebsite(userId, website)  {

        }
        function findWebsitesByUser(userId) {
            var websiteLists =[];
            for (var website in websites) {
                if (websites[website].developerId === userId) {
                    websiteLists.push( websites[website]);
                }
            }
            return websiteLists;

        }
        function findWebsiteById(websiteId){
            for (var website in websites) {
                if (websites[website]._id === websiteId) {
                    return websites[website];
                }
            }
            return null;
        }
        function updateWebsite(websiteId, website)  {

        }
        function deleteWebsite(websiteId) {
            var websiteLists =[];
            for (var website in websites) {
                if (websites[website]._id === websiteId) {
                    websites.splice(website, 1);
                    return websites;


                }
            }


        }

    }
})();
