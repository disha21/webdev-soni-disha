module.exports = function (app, model) {

    console.log("hello from widget service");


    var multer = require('multer'); // npm install multer --save
    var upload = multer({dest: __dirname + '/../../public/assignment/uploads'});


    app.post("/api/upload", upload.single('imageFile'), uploadImage);
    app.post('/api/user/:userId/website/:websiteId/page/:pageId/widget', createWidget);
    app.get('/api/user/:userId/website/:websiteId/page/:pageId/widget', findAllWidgetsForPage);
    app.get('/api/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId', findWidgetById);
    app.put('/api/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId', updateWidget);
    app.delete('/api/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId', deleteWidget);
  //  app.put('/api/user/:userId/website/:websiteId/page/:pageId/widget/', updateSortingWidget);



    function createWidget(req, res) {
        var pageId = req.params.pageId;
        console.log("pageId" + pageId);
        var widget = req.body;
        console.log("createwidget");
        console.log(widget);
        model
            .widgetModel
            .createWidget(pageId, widget)
            .then(function (widget) {
                console.log("widget");
                console.log(widget);
                    res.send(widget);

                }, function (error) {
                    console.log("widget not created");
                    res.sendStatus(400).send(error);
                }
            );
    }

/*
    function updateSortingWidget(req, res) {
        var pageId = req.params.pageId;
        var start = req.query.initial;
        var end = req.query.end;
        console.log("pageId + start +end");
        console.log(pageId + start +end);

        model
            .widgetModel
            .updateSortingWidget(pageId, start, end)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });
    }*/



      /*
        var start = req.query.start;
        var end = req.query.end;
        console.log(start, end);
        widgets.splice(end, 0, widgets.splice(start, 1)[0]);*/



    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        console.log("pageId :" + pageId);
        model
            .widgetModel
            .findAllWidgetsForPage(pageId)
            .then(function (widgets) {
                    res.send(widgets);
                },function (error) {
                    res.sendStatus(400).send(error);
                }
            );


    }

    function findWidgetById(req, res) {
       //  console.log(req);
        var widgetId = req.params.widgetId;
        console.log("in find:" + widgetId);
        model
            .widgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                    res.send(widget);

                }, function (error) {
                    res.sendStatus(400).send(error);
                }
            );

    }

    function updateWidget(req, res) {
        console.log("in update server");
        var widget = req.body;
        console.log(widget);
        var widgetId = req.params.widgetId;
        console.log( "widgetId:"+ widgetId);
        model
            .widgetModel
            .updateWidget(widgetId,widget)
            .then(function (status) {
                    res.send(200);
                },function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }


    function deleteWidget(req, res) {
        var widgetId = (req.params.widgetId);
        var pageId = (req.params.pageId);
        model
            .widgetModel
            .deleteWidget(widgetId,pageId)
            .then(function (status) {
                    res.send(200);
                },function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }



    function uploadImage(req, res) {
        console.log("in upload");
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;
        var widgetId = req.body.widgetId;
        var imageFile = req.file;
        var width = req.body.width;


        var originalname = imageFile.originalname; // file name on user's computer
        var filename = imageFile.filename;     // new file name in upload folder
        var path = imageFile.path;         // full path of uploaded file
        var destination = imageFile.destination;  // folder where file is saved to
        var size = imageFile.size;
        var mimetype = imageFile.mimetype;

        console.log("in updated url");

        model
            .widgetModel
            .uploadImage(widgetId, imageFile,width)
            .then(function () {
                    res.redirect('../assignment/index.html#/user/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget/' + widgetId);
                }, function (error) {
                    res.sendStatus(400).send(error);
                });
    }
       /* for (var wg in widgets) {
            if (widgets[wg]._id === widgetId) {
                console.log(widgetId + " : " + widgets[wg]._id);
                widgets[wg].url = '/assignment/uploads/' + filename;
                widgets[wg].width = width;
                console.log("updated url");
                console.log(widgets[wg]);

            }
        }
//res.send(imageFile);
        res.redirect('../assignment/index.html#/user/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget/' + widgetId);
    */


}