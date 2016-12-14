/**
 * Created by dishasoni on 11/15/16.
 */
module.exports =function () {
    var model ={};
    var mongoose = require('mongoose');
    var UserSchema =  require("./user.schema.server.js")();
    var UserProjectModel = mongoose.model("UserProjectModel",UserSchema);


    var api = {
         createUser   : createUser,
         findUserById :findUserById,
         updateUser   : updateUser,
         findUserByCredentials:findUserByCredentials,
         deleteUser : deleteUser,
         findUserByUsername :findUserByUsername,
         findProductsTrackedByUser:findProductsTrackedByUser,
         setModel:setModel,
         findAllUsers:findAllUsers,
        findProductTrackerByUserAndProductId:findProductTrackerByUserAndProductId,
        findGoogleUser: findGoogleUser,
        deleteProductForUser : deleteProductForUser,
        addFollowerToUser: addFollowerToUser,
        unFollowUser: unFollowUser,
        findUsersByIds:findUsersByIds
    };

    return api;

    function findUsersByIds(ids) {
        return UserProjectModel.find({
            '_id': { $in: ids}
        }, "username", function(err, docs){
            console.log(docs);
        });
    }

    function deleteProductForUser(userId, productId) {
        return UserProjectModel.update( { _id: userId}, { $pullAll: {products: [productId] } } );
    }

    function findAllUsers(){
        // return ProductModel.find().distinct('productId','productProvider');
         return UserProjectModel.find({});

    }

    function findGoogleUser(id){
        return UserProjectModel.findOne({"google.id": id});
    }


    function setModel(_model) {
        model = _model;
    }


    function findProductsTrackedByUser(userId) {
        console.log( "userId:"+ userId);
        return UserProjectModel.findById(userId)
            .populate("products")
            .exec();
    }


    function findProductTrackerByUserAndProductId(userId, productId) {
        console.log( "findProductTrackerByUserAndProductId:"+ userId);

        return UserProjectModel.find({
            _id : userId,
            products: { $in: [productId] }
        });


    }

    function addFollowerToUser(userId, userToFollow) {

        return UserProjectModel.update(
            { _id: userId },
            { $push: { following: userToFollow._id } }
        );
    }

    function unFollowUser(userId, unfollowUser) {
        return UserProjectModel.update( { _id: userId}, { $pullAll: {following: [unfollowUser._id] } } );
    }

    function updateUser(userId,user) {
        console.log( "userId:"+ userId);
         return UserProjectModel.update(
             {
              _id : userId
              },
             {   name :user.name,
                 email :user.email,
                 phone :user.phone,
                 address :user.address
             }
         );
    }

    function createUser(user) {
        return UserProjectModel.create(user);
    }

    function deleteUser(userId) {
        return UserProjectModel.remove({
            _id : userId
        });
    }


    function findUserByCredentials(username,password) {
        return UserProjectModel.findOne({
            username:username,
            password:password
        });
    }

    function findUserByUsername(username){
        return UserProjectModel.find({
            username:username
        });
    }

    function findUserById(userId) {

        return UserProjectModel.findById(userId);
    }
};