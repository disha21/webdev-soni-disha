


module.exports = function(app) {
    console.log("hello from app js");
    require("./services/homepage.service.server")(app);

};
