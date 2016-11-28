module.exports =function () {
    var model ={};
    var mongoose = require('mongoose');
    var PageSchema =  require("../page/page.schema.server.js")();
    var WidgetSchema =  require("../widget/widget.schema.server.js")();
    var WidgetModel = mongoose.model("WidgetModel",WidgetSchema);


    var multer = require('multer'); // npm install multer --save
    var upload = multer({dest: __dirname + '/../../public/assignment/uploads'});



    var api = {
        createWidget  : createWidget,
        setModel:setModel,
        findWidgetById:findWidgetById,
        findAllWidgetsForPage:findAllWidgetsForPage,
        deleteWidget:deleteWidget,
        updateWidget:updateWidget,
        uploadImage:uploadImage,


    };

    return api;

    function setModel(_model) {
        model = _model;
    }




    function uploadImage(widgetId,imagefile,width){
        return WidgetModel.findById(widgetId)
            .then(function (widgetObj) {
                widgetObj.url ='/assignment/uploads/' + imagefile.filename;
                widgetObj.width = width;
                widgetObj.save();
            })
    }

    function createWidget(pageId,widget) {
        return WidgetModel.create(widget)
            .then(function(widgetObj) {
               return model
                    .pageModel
                    .findPageById(pageId)
                    .then(function (pageObj) {
                        console.log("pageObj");
                        console.log(pageObj);
                        pageObj.widgets.push(widgetObj);
                        widgetObj._page = pageObj._id;
                        pageObj.save();
                        console.log("widgetObj");
                        console.log(widgetObj);
                        return widgetObj.save();
                    });
            });
    }

    function findWidgetById(widgetId) {
        // return UserModel.find({_id : userId});
       return WidgetModel.findById(widgetId);
    }


        function findAllWidgetsForPage(pageId) {
            console.log("findAllWidgetsForPage");
            return model.pageModel.findAllWidgetsForPage(pageId);
        }



        function updateWidget(widgetId,widget) {
            console.log( "widgetId:"+ widgetId);
            return WidgetModel.update(
                {
                    _id : widgetId
                },
                {   name :widget.name,
                    text :widget.text,
                    url:widget.url,
                    width:widget.width,
                    widget:widget.size,
                    rows:widget.rows,
                    placeholder:widget.placeholer,
                    formatted: widget.formatted
                }
            );
        }


        function deleteWidget(widgetId) {
            return WidgetModel.remove({
                _id : widgetId
            });

        }




};
