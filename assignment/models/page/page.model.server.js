/**
 * Created by dishasoni on 11/15/16.
 */
module.exports = function () {
    var model = {};
    var mongoose = require('mongoose');
    var PageSchema = require("./page.schema.server.js")();
    var WebsiteSchema = require("../website/website.schema.server.js")();
    var PageModel = mongoose.model("PageModel", PageSchema);


    var api = {
        createPage: createPage,
        setModel: setModel,
        findPageById: findPageById,
        updatePage: updatePage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        deletePage: deletePage,
        findAllWidgetsForPage: findAllWidgetsForPage,
        updateSortingWidget:updateSortingWidget

    };

    return api;


    function updateSortingWidget(pageId, start, end) {
        console.log("start" + start +"end" +end);
        return PageModel.findById(pageId)
            .then (function (pageObj) {
                console.log(pageObj.widgets);
                pageObj.widgets.splice(end,0,pageObj.widgets.splice(start,1)[0]);
                console.log(pageObj.widgets);
                return pageObj.save();

    });
    }

    function setModel(_model) {
        model = _model;
    }

    function createPage(websiteId, page) {
        return PageModel.create(page)
            .then(function (pageObj) {
                return model
                    .websiteModel
                    .findWebsiteById(websiteId)
                    .then(function (websiteObj) {
                        websiteObj.pages.push(pageObj)
                        pageObj._website = websiteObj._id
                        websiteObj.save();
                        return pageObj.save();
                    });
            });
    }

    function findAllPagesForWebsite(websiteId) {
        console.log("findAllPagesForWebsite");
        return model.websiteModel.findAllPagesForWebsite(websiteId);
    }

    function findPageById(pageId) {
        // return UserModel.find({_id : userId});
        return PageModel.findById(pageId);
    }


    function updatePage(pageId, page) {
        console.log("pageId:" + pageId);
        return PageModel.update(
            {
                _id: pageId
            },
            {
                name: page.name,
                title: page.title
            }
        );
    }

    function deletePage(pageId) {
        return PageModel.remove({
            _id: pageId
        });

    }

    function findAllWidgetsForPage(pageId) {
        console.log("pageId:" + pageId);
        return PageModel.findById(pageId)
            .populate("widgets")
            .exec();
    }


};