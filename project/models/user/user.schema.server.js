/**
 * Created by dishasoni on 11/15/16.
 */
module.exports = function () {
    var mongoose = require('mongoose');


    var UserSchema = mongoose.Schema({
        google: {
            token: String,
            id: String,
            displayName: String
        },
        username :String,
        password :String,
        name :String,
        email :String,
        phone :String,
        address:String,
        products :[{type: mongoose.Schema.Types.ObjectId,ref:'ProductModel'}],
        following : [{type: mongoose.Schema.Types.ObjectId, ref: 'UserProjectModel'}],
        dateCreated: {type: Date, default: Date.now}

    },{collection:"project.user"});

    return UserSchema;
};