/**
 * Created by dishasoni on 11/15/16.
 */
module.exports =function () {
    var model ={};
    var mongoose = require('mongoose');
    var UserSchema =  require("./user.schema.server.js")();
    var UserModel = mongoose.model("UserModel",UserSchema);


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
        findGoogleUser: findGoogleUser
    };

    return api;

    function findAllUsers(){
        // return ProductModel.find().distinct('productId','productProvider');
         return UserModel.find({});

    }

    function findGoogleUser(id){
        return UserModel.findOne({"google.id": id});
    }


    function setModel(_model) {
        model = _model;
    }


    function findProductsTrackedByUser(userId) {
        console.log( "userId:"+ userId);
        return UserModel.findById(userId)
            .populate("products")
            .exec();
    }


    function findProductTrackerByUserAndProductId(userId, productId) {
        console.log( "findProductTrackerByUserAndProductId:"+ userId);

        return UserModel.find({
            _id : userId,
            products: { $in: [productId] }
        });


    }


    function updateUser(userId,user) {
        console.log( "userId:"+ userId);
         return UserModel.update(
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
        return UserModel.find({
            username:username
        });
    }

    function findUserById(userId) {
        // return UserModel.find({_id : userId});
        return UserModel.findById(userId);
    }
};