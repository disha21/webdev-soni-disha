/**
 * Created by dishasoni on 11/15/16.
 */
module.exports =function () {
    var model ={};
    var mongoose = require('mongoose');
    var UserSchema =  require("./user.schema.server.js")();
    var WebsiteSchema =  require("../website/website.schema.server.js")();
    var UserModel = mongoose.model("UserModel",UserSchema);
    //var WebsiteModel = mongoose.model("WebsiteModel",WebsiteSchema);

    var api = {
         createUser   : createUser,
         findUserById :findUserById,
         updateUser   : updateUser,
         findUserByCredentials:findUserByCredentials,
         deleteUser : deleteUser,
         findUserByUsername :findUserByUsername,
         findAllWebsitesForUser:findAllWebsitesForUser,
         setModel:setModel,
         findUserByFacebookId:findUserByFacebookId
    };

    return api;

    function findUserByFacebookId(facebookId) {
        return UserModel.findOne({'facebook.id': facebookId});
    }


    function setModel(_model) {
        model = _model;
    }


    function findAllWebsitesForUser(userId) {
        console.log( "userId:"+ userId);
        return UserModel.findById(userId)
            .populate("websites","name")
            .exec();
    }


    function updateUser(userId,user) {
        console.log( "userId:"+ userId);
         return UserModel.update(
             {
              _id : userId
              },
             {   firstName :user.firstName,
                 lastName :user.lastName
             }
         );
    }

    function createUser(user) {
        return UserModel.create(user);
    }

    function deleteUser(userId) {
        return UserModel.remove({
            _id : userId
        });
    }


    function findUserByCredentials(username,password) {
       // return UserModel.find({_id : userId});
        return UserModel.findOne({
            username:username,
            password:password
        });
    }

    function findUserByUsername(username) {
        // return UserModel.find({_id : userId});
        return UserModel.findOne({
            username:username
        });
    }

    function findUserById(userId) {
        // return UserModel.find({_id : userId});
        return UserModel.findById(userId);
    }
};