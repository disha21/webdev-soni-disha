/**
 * Created by dishasoni on 11/15/16.
 */
module.exports =function () {
    var model ={};
    var mongoose = require('mongoose');
    var WebsiteSchema =  require("./website.schema.server.js")();
    var WebsiteModel = mongoose.model("WebsiteModel",WebsiteSchema);
    var PageSchema =  require("../page/page.schema.server.js")();

    var api = {
        createWebsiteForUser  : createWebsiteForUser,
        findAllWebsitesForUser :findAllWebsitesForUser,
        setModel:setModel,
        findWebsiteById:findWebsiteById,
        updateWebsite:updateWebsite,
        deleteWebsite:deleteWebsite,
        findAllPagesForWebsite:findAllPagesForWebsite

    };

    return api;

    function setModel(_model) {
        model = _model;
    }

    function createWebsiteForUser(userId,website) {
        return WebsiteModel.create( website)
            .then(function (websiteObj) {
                model
                    .userModel
                    .findUserById(userId)
                    .then(function (userObj) {
                        userObj.websites.push(websiteObj)
                        websiteObj._user = userObj._id
                        websiteObj.save()
                        userObj.save();
                        return userObj;
                    });
            });
    }

    function findAllWebsitesForUser(userId) {
        console.log("findAllWebsitesForUser");
        return model.userModel.findAllWebsitesForUser(userId);
    }

    function findWebsiteById(websiteId) {
        // return UserModel.find({_id : userId});
        return WebsiteModel.findById(websiteId);
    }


    function updateWebsite(websiteId,website) {
        console.log( "websiteId:"+ websiteId);
        return WebsiteModel.update(
            {
                _id : websiteId
            },
            {   name :website.name,
                description :website.description
            }
        );
    }

    function deleteWebsite(websiteId) {
        return WebsiteModel.remove({
            _id : websiteId
        });

    }

    function findAllPagesForWebsite(websiteId) {
        console.log( "websiteId:"+ websiteId);
        return WebsiteModel.findById(websiteId)
            .populate("pages","name")
            .exec();
    }


};