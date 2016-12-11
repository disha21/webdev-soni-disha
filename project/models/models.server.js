

module.exports =function () {


    var userModel =require("./user/user.model.server")();
    var productModel =require("./product/product.model.server")();




   var model ={
       userModel:userModel,
      productModel:productModel

   };

    userModel.setModel(model);
    productModel.setModel(model);

    return model;

    
};
