


module.exports = function(app) {
    console.log("hello from app js");
    var model = require("./models/models.server")();
    require("./services/homepage.service.server")(app,model);
    require("./services/user.service.server")(app,model);
    require("./services/product.service.server")(app,model);
    require("./services/admin.service.server")(app,model);

    if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
        connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
            process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
            process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
            process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
            process.env.OPENSHIFT_APP_NAME;
    }

    var mongoose = require("mongoose");
    mongoose.connect(connectionString);

};
