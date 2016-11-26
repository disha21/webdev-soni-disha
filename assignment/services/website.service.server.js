module.exports = function(app,model) {

    console.log("hello from website service");


    app.post('/api/user/:userId/website',createWebsite);
    app.get('/api/user/:userId/website',findAllWebsitesForUser);
    app.put('/api/user/:userId/website/:websiteId',updateWebsite);
    app.get('/api/user/:userId/website/:websiteId',findWebsiteById);
    app.delete('/api/user/:userId/website/:websiteId',deleteWebsite);


    function createWebsite(req,res) {
        var userId = req.params.userId;
        var website = req.body;
        console.log("createwebsite");
        console.log(website);
        model
            .websiteModel
            .createWebsiteForUser(userId,website)
            .then(function (website) {
                    res.send(website);
                }, function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }


    function deleteWebsite(req,res) {
        var websiteId = (req.params.websiteId);
        model
            .websiteModel
            .deleteWebsite(websiteId)
            .then(function (status) {
                    res.send(200);
                },function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }


    function updateWebsite(req,res) {
        console.log("in update server");
        var website = req.body;
        console.log(website);
        var websiteId = req.params.websiteId;
        console.log( "websiteId:"+ websiteId);
        model
            .websiteModel
            .updateWebsite(websiteId,website)
            .then(function (status) {
                    res.send(200);
                },function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }


    function findAllWebsitesForUser(req,res){
       var userId = req.params.userId;
        console.log("User id :" + userId);
        model
            .websiteModel
            .findAllWebsitesForUser(userId)
            .then(function (websites) {
                    res.send(websites);
                },function (error) {
                    res.sendStatus(400).send(error);
                }
            );



    }

    function findWebsiteById(req,res){
        var websiteId = req.params.websiteId;
        console.log( "in find:" + websiteId);
        model
            .websiteModel
            .findWebsiteById(websiteId)
            .then(function (website) {
                    if(website){
                        res.send(website);
                    }else{
                        res.send(null);
                    }
                },function (error) {
                    res.sendStatus(400).send(error);
                }
            );

    }
};