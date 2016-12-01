/**
 * Created by dishasoni on 11/15/16.
 */
module.exports = function () {
    var mongoose = require('mongoose');


    var UserSchema = mongoose.Schema({
        username :String,
        password :String,
        name :String,
        email :String,
        phone :String,
        address:String,
        dob: {type: Date},
        dateCreated: {type: Date, default: Date.now}

    },{collection:"user"});

    return UserSchema;
};