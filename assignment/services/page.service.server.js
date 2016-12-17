module.exports = function(app) {

    console.log("hello from page service");

   var pages = [
        { "_id": 321, "name": "Post 1", "websiteId": 456 },
        { "_id": 432, "name": "Post 2", "websiteId": 456 },
        { "_id": 543, "name": "Post 3", "websiteId": 456 },
        { "_id": 549, "name": "Post 4", "websiteId": 123 }
    ];

    app.post('/api/user/:userId/website/:websiteId/page',createPage);
    app.get('/api/user/:userId/website/:websiteId/page',findAllPagesForWebsite);
    app.get('/api/user/:userId/website/:websiteId/page/:pageId',findPageById);
    app.put('/api/user/:userId/website/:websiteId/page/:pageId',updatePage);
    app.delete('/api/user/:userId/website/:websiteId/page/:pageId',deletePage);



    function findAllPagesForWebsite(req,res){
        var wid = req.params.websiteId;
        var pageList = [];
        for(var p in pages) {
            if(pages[p].websiteId == wid) {
                pageList.push(pages[p]);
        }
        }
        res.send(pageList);
    }


    function findPageById(req,res){
        var pid = req.params.pageId;
        for(var p in pages) {
            if(pages[p]._id == pid) {
                res.send(pages[p]);
                return;
            }
        }
        res.send('0');
    }

    function updatePage(req,res) {
        console.log("in update server");
        var page = req.body;
        console.log(page);
        var pageId = parseInt(req.body._id);
        console.log("pageId" + pageId);
        for (var p in pages) {
            if (pages[p]._id == pageId) {
                pages[p] = page;

            }
        }
        console.log(page);
        console.log(pages);
        res.json(page);
    }

   function createPage(req,res) {
        var page = req.body;
        page._id = (new Date()).getTime();
        console.log("page in create");
        console.log(page);
        console.log(page._id);
        console.log(page);
        console.log("pages array");
        pages.push(page);
        console.log(pages);
        res.json(page);
    }


    function deletePage(req,res) {
        console.log("InDelete" +req.params.pageId);
        var pageId = parseInt(req.params.pageId);
        console.log(pageId);
        for (p in pages) {
            if (pages[p]._id == pageId) {
                console.log("yes");
                console.log(p);
                console.log(pages[p]);
                pages.splice(p, 1);
            }
        }
        res.send(pages);
    }



};