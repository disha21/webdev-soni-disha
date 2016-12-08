module.exports = function(app,model) {


console.log("in admin server");



    app.get('/api/user/:userId/users',findAllUsers);

    app.get('/api/user/:userId/products',findAllTrackedProducts);


    function findAllTrackedProducts(req,res) {
        console.log("hello from admin");

        model.productModel
            .findAllTrackedProducts()
            .then(function(products){
                if(products!=null){
                    console.log("products");
                    console.log(products);
                    res.json(products);
                }else{
                    res.send(400);
                }
            });



    }




    function findAllUsers(req,res) {
        console.log("hello from admin");

        model.userModel
            .findAllUsers()
            .then(function(users){
               if(users!=null){
                   console.log("users");
                   console.log(users);
                   res.json(users);
               }else{
                   res.send(400);
               }
        });



    }



};