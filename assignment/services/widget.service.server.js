module.exports = function (app) {

    console.log("hello from widget service");

var widgets =
    [
        { "_id": 123, "widgetType": "HEADER", "pageId": 321, "size": 2, "text": "GIZMODO"},
        { "_id": 234, "widgetType": "HEADER", "pageId": 321, "size": 4, "text": "Lorem ipsum"},
        { "_id": 345, "widgetType": "IMAGE", "pageId": 321, "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": 456, "widgetType": "HTML", "pageId": 321, "text": "<p>Lorem ipsum</p>"},
        { "_id": 567, "widgetType": "HEADER", "pageId": 321, "size": 4, "text": "Lorem ipsum"},
        { "_id": 678, "widgetType": "YOUTUBE", "pageId": 321, "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": 789, "widgetType": "HTML", "pageId": 321, "text": "<p>Lorem ipsum</p>"}
    ];

    var multer = require('multer'); // npm install multer --save
    var upload = multer({dest: __dirname + '/../../public/assignment/uploads'});


    app.post("/api/upload", upload.single('imageFile'), uploadImage);
    app.post('/api/user/:userId/website/:websiteId/page/:pageId/widget', createWidget);
    app.get('/api/user/:userId/website/:websiteId/page/:pageId/widget', findAllWidgetsForPage);
    app.get('/api/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId', findWidgetById);
    app.put('/api/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId', updateWidget);
    app.delete('/api/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId', deleteWidget);
    app.put("/page/:pageId/widget", updateSortingWidget);


    function createWidget(req, res) {
        var widget = req.body;
        var pId = req.params.pageId;
        widget.pageId = pId;
        widget._id = (new Date().getTime()).toString();
        widgets.push(widget);
        res.send(widget);
    }



    function updateSortingWidget(req, res) {
        var pageId = req.params.pageId;
        console.log("in widgets sort");
        var start = req.query.start;
        var end = req.query.end;
        console.log(start, end);
        var widgetList =[];
        for(var w in widgets) {
            if(widgets[w].pageId == pageId) {
                widgetList.push(widgets[w]);
            }
        }
        console.log("widgets old");
        console.log(widgetList);
        widgetList.splice(end, 0, widgetList.splice(start, 1)[0]);
        console.log("widgets new");
        console.log(widgetList);
        widgets=widgetList;

        //res.send(widgetList);
    }


    function findAllWidgetsForPage(req, res) {
        var pid = req.params.pageId;
        var widgetList = [];
        for(var w in widgets) {
            if(widgets[w].pageId == pid) {
                widgetList.push(widgets[w]);
            }
        }
        res.send(widgetList);
    }


    function findWidgetById(req, res) {
        var wid = req.params.widgetId;
        for(var w in widgets) {
            if(widgets[w]._id == wid) {
                res.send(widgets[w]);
                return;
            }
        }
        res.send('0');
    }


    function updateWidget(req, res) {
        var widget = req.body;
        var wid = req.params.widgetId;
        for(var w in widgets) {
            if(widgets[w]._id == wid) {
                widgets[w] = widget;
                res.sendStatus(200);
                return;
            }
        }
        res.send(400);
    }

    function deleteWidget(req, res) {
        console.log("InDelete" + req.params.widgetId);
        var widgetId = req.params.widgetId;
        console.log(widgetId);
        for (wg in widgets) {
            if (widgets[wg]._id == widgetId) {
                console.log("yes");
                console.log(wg);
                console.log(widgets[wg]);
                widgets.splice(wg, 1);
            }
        }
        res.send(widgets);
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

        for (var wg in widgets) {
            if (widgets[wg]._id == widgetId) {
                console.log(widgetId + " : " + widgets[wg]._id);
                widgets[wg].url = '/assignment/uploads/' + filename;
                widgets[wg].width = width;
                console.log("updated url");
                console.log(widgets[wg]);

            }
        }
//res.send(imageFile);
        res.redirect('../assignment/index.html#/user/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget/' + widgetId);
    }

}