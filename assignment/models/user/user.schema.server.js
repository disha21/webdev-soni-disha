/**
 * Created by dishasoni on 11/15/16.
 */
module.exports = function () {
    var mongoose = require('mongoose');
    var WebsiteSchema = require("../website/website.schema.server")

    var UserSchema = mongoose.Schema({
        facebook: {
            id:    String,
            token: String
        },
        username :String,
        password :String,
        firstName :String,
        lastName :String,
        email :String,
        phone :String,
        websites :[{type: mongoose.Schema.Types.ObjectId,ref:'WebsiteModel'}],
        //websites:[WebsiteSchema],
        dateCreated: {type: Date, default: Date.now}

    },{collection:"user"});

    return UserSchema;
};