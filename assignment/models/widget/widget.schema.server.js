module.exports = function () {
    var mongoose = require('mongoose');
    var PageSchema = require("../page/page.schema.server");

    var WidgetSchema = mongoose.Schema({
        _page :[{ type: mongoose.Schema.Types.ObjectId, ref: 'PageModel' }],
        widgetType: {type: String, enum:['HEADER', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT']},
        name:String,
        text:String,
        placeholder:String,
        description:String,
        url:String,
        width:String,
        height:String,
        rows:String,
        size:String,
        class:String,
        icon:String,
        deletable:Boolean,
        formatted:Boolean,
        dateCreated: {type: Date, default: Date.now}

    },{collection:"widget"});

    return WidgetSchema;
};

