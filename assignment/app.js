


module.exports = function(app) {
    console.log("hello from app js");
    // var model = require("./models/models.server")();
    // model.userModel
    // model.websiteModel
    // model.pageModel
    // model.widgetModel
    require("./services/user.service.server.js")(app);
    require("./services/website.service.server.js")(app);
    require("./services/page.service.server.js")(app);
    require("./services/widget.service.server.js")(app);
};
