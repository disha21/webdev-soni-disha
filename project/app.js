


module.exports = function(app) {
    console.log("hello from app js");
    var model = require("./models/models.server")();
    require("./services/homepage.service.server")(app,model);
    require("./services/user.service.server")(app,model);
    require("./services/product.service.server")(app,model);
    require("./services/admin.service.server")(app,model);



};
