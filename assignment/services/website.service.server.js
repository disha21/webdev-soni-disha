module.exports = function(app) {

    console.log("hello from website service");

   var websites = [
        { "_id": 123, "name": "Facebook",    "developerId": 456 },
        { "_id": 234, "name": "Tweeter",     "developerId": 456 },
        { "_id": 456, "name": "Gizmodo",     "developerId": 456 },
        { "_id": 567, "name": "Tic Tac Toe", "developerId": 123 },
        { "_id": 678, "name": "Checkers",    "developerId": 123 },
        { "_id": 789, "name": "Chess",       "developerId": 234 }


    ];


    app.post('/api/user/:userId/website',createWebsite);
    app.get('/api/user/:userId/website',findAllWebsitesForUser);
    app.put('/api/user/:userId/website/:websiteId',updateWebsite);
    app.get('/api/user/:userId/website/:websiteId',findWebsiteById);
    app.delete('/api/user/:userId/website/:websiteId',deleteWebsite);


    function createWebsite(req,res) {
        var website = req.body;
        console.log(website);
        website._id = (new Date()).getTime();
        console.log(website._id);
        websites.push(website);
        res.json(website);


    }

    function deleteWebsite(req,res) {
        console.log("InDelete" +req.params.websiteId);
        var websiteId = parseInt(req.params.websiteId);
        console.log(websiteId);
        for (w in websites) {
            if (websites[w]._id == websiteId) {
                console.log("yes");
                console.log(w);
                console.log(websites[w]);
                websites.splice(w, 1);
            }
        }
        res.send(websites);
    }


    function updateWebsite(req,res) {
        console.log("in update server");
        var website = req.body;
        console.log(website);
        var websiteId = parseInt(req.body._id);
        console.log("websiteid" + websiteId);
        console.log("All websites " + websites);
        for (w in websites) {
            if (websites[w]._id === websiteId) {
                websites[w] = website;

            }
        }
        console.log(website);
        console.log(websites);
        res.json(website);
    }



    function findAllWebsitesForUser(req,res){
       var userId = req.params.userId;
        var websitesList =[];
        console.log("user" + userId);
        for(website in websites){
            if(websites[website].developerId == userId){
                websitesList.push(websites[website]);
            }

        }
        console.log(websitesList);
        res.json(websitesList);




    }

    function findWebsiteById(req,res){
        var websiteId = parseInt(req.params.websiteId);
        console.log( "websiteId" +websiteId);
        for(w in websites){
            if(websites[w]._id === websiteId){
                res.json(websites[w]);

            }
        }


    }
};