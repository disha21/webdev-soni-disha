/**
 * Created by dishasoni on 11/15/16.
 */
module.exports = function () {
    var mongoose = require('mongoose');
    var WebsiteSchema = require("../website/website.schema.server");
    var WidgetSchema = require("../widget/widget.schema.server");

    var PageSchema = mongoose.Schema({
        _website:[{ type: mongoose.Schema.Types.ObjectId, ref: 'WebsiteModel' }],
        name :String,
        title:String,
        description :String,
        widgets :[{type: mongoose.Schema.Types.ObjectId,ref:'WidgetModel'}],
        dateCreated: {type: Date, default: Date.now}


    },{collection:"page"});

    return PageSchema;
};
