module.exports = function(app,model) {

    console.log("hello from page service");

    app.post('/api/user/:userId/website/:websiteId/page',createPage);
    app.get('/api/user/:userId/website/:websiteId/page',findAllPagesForWebsite);
    app.get('/api/user/:userId/website/:websiteId/page/:pageId',findPageById);
    app.put('/api/user/:userId/website/:websiteId/page/:pageId',updatePage);
    app.delete('/api/user/:userId/website/:websiteId/page/:pageId',deletePage);
    app.put('/api/user/:userId/website/:websiteId/page/:pageId/widget/', updateSortingWidget);



    function updateSortingWidget(req, res) {
        var pageId = req.params.pageId;
        var start = req.query.start;
        var end = req.query.end;
        console.log("pageId + start +end");
        console.log(pageId + start +end);

        model
            .pageModel
            .updateSortingWidget(pageId, start, end)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });
    }

    function findAllPagesForWebsite(req,res){
        var websiteId = req.params.websiteId;
        console.log("websiteId :" + websiteId);
        model
            .pageModel
            .findAllPagesForWebsite(websiteId)
            .then(function (pages) {
                    res.send(pages);
                },function (error) {
                    res.sendStatus(400).send(error);
                }
            );


    }

    function findPageById(req,res){
        var pageId = req.params.pageId;
        console.log( "in find:" + pageId);
        model
            .pageModel
            .findPageById(pageId)
            .then(function (page) {
                    if(page){
                        res.send(page);
                    }else{
                        res.send(null);
                    }
                },function (error) {
                    res.sendStatus(400).send(error);
                }
            );

    }

    function updatePage(req,res) {
        console.log("in update server");
        var page = req.body;
        console.log(page);
        var pageId = req.params.pageId;
        console.log( "pageId:"+ pageId);
        model
            .pageModel
            .updatePage(pageId,page)
            .then(function (status) {
                    res.send(200);
                },function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }


    function createPage(req,res) {
        var websiteId = req.params.websiteId;
        console.log("websiteId" +websiteId);
        var page = req.body;
        console.log("createpage");
        console.log(page);
        model
            .pageModel
            .createPage(websiteId, page)
            .then(function (page) {
                    console.log("returning " + page);
                    res.send(page);
                }, function (error) {
                    console.log("page not created");
                    res.sendStatus(400).send(error);
                }
            );
    }

    function deletePage(req,res) {
        var pageId = (req.params.pageId);
        model
            .pageModel
            .deletePage(pageId)
            .then(function (status) {
                    res.send(200);
                },function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }



};