/**
 * Created by dishasoni on 11/15/16.
 */
module.exports = function () {
    var mongoose = require('mongoose');
    var PageSchema = require("../page/page.schema.server");
    var WebsiteSchema = mongoose.Schema({
         _user:[{ type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' }],
        name :String,
        description :String,
        pages :[{type: mongoose.Schema.Types.ObjectId,ref:'PageModel'}],
        dateCreated: {type: Date, default: Date.now}


    },{collection:"web  site"});

    return WebsiteSchema;
};
