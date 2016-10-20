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
        function createWebsite(userId, newWebsite)  {
            var websiteList =[];
            console.log("wesbites"+ findWebsitesByUser(userId));
            var websiteList = findWebsitesByUser(userId);
            console.log("websitelist"+ websiteList);
            for(website in websiteList){
                if (website.name!== newWebsite.name) {
                    var lastWebsite = websites[website.length - 1];
                    var website_id = lastWebsite._id +1;
                    console.log(website_id );
                    var newWebsiteObject =  {_id: website_id,
                        name:newWebsite.name ,
                        developerId:userId
                    };
                    console.log(newWebsiteObject);
                    websites.push(newWebsiteObject);
                    console.log(websites);
                    return newWebsiteObject;
            }else{
                  return null;
                }


            }

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
        function updateWebsite(websiteId, updatedWebsite)  {
            for (var website in websites) {
                if (websites[website]._id === websiteId) {
                    websites[website].name = updatedWebsite.name;
                    return true;
                }
            }
            return false;
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

