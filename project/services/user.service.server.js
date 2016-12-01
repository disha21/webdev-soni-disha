module.exports = function(app,model) {

    console.log("hello from user service");
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);




    app.post('/api/user',createUser);
    app.put('/api/user/:uid',updateUser);
    app.get('/api/user',findUser);
    app.get('/api/user/:uid',findUserById);
    app.put('/api/user/:uid',updateUser);
    app.delete('/api/user/:uid',deleteUser);
    app.post('/api/login', passport.authenticate('local'), login);
    app.post('/api/checkLoggedin',checkLoggedin);
    app.post('/api/logout', logout);



    function logout(req, res) {
        req.logout();
        res.send(200);
    }
    function checkLoggedin(req,res){
        res.send(req.isAuthenticated() ? req.user : '0');

    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        model.
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function localStrategy(username,password,done) {
        console.log("username + password");
        console.log(username + password);
        model
            .userModel
            .findUserByCredentials(username,password)
            .then(
                function(user) {
                    if(!user) {
                        return done(null, false);
                    } else {

                        return done(null, user)
                    }
                },
                function(err) {
                    if (err)
                    { return done(err); }
                }
            );
    }


    function login(req,res) {
        var user = req.user;
        res.json(user);
    }

    function createUser(req,res) {
        var user = req.body;
        console.log("createuser");
        console.log(user.username);
       // var ret = findUserByUsername(user.username);
        console.log("return");
       // console.log(ret);
             model
                 .userModel
                 .createUser(user)
                 .then(function (newUser) {
                         res.send(newUser);
                     }, function (error) {
                         res.sendStatus(400).send(error);
                     }
                 );
    }

    function updateUser(req,res) {
        console.log("in update server");
        var user = req.body;
        console.log(user);
        var userId = req.params.uid;
        console.log( "userId:"+ userId);
       model
           .userModel
           .updateUser(userId,user)
           .then(function (status) {
                   res.send(200);
               },function (error) {
                   res.sendStatus(400).send(error);
               }
           );
    }

    function deleteUser(req,res) {
        var userId = (req.params.uid);
        model
            .userModel
            .deleteUser(userId)
            .then(function (status) {
                    res.send(200);
                },function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }


    function findUser(req,res) {
        console.log("hello from api");
        var params = req.params;
        var query = req.query;
        console.log(req);
        console.log(params);
        console.log(query);


        if(query.username && query.password){
            findUserByCredentials(req,res);
        }else if(query.username){
            findUserByUsername(req,res);
        }

    }

    function findUserByCredentials(req,res){
        var username = req.query.username;
        var password = req.query.password;
        model
            .userModel
            .findUserByCredentials(username,password)
            .then(function (users) {
                console.log("findUserByCredentials");
                console.log(users);
                    if(users.length >0){
                        res.send(users[0]);
                    }else{
                        res.send("0");
                    }
                },function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findUserByUsername(req,res){
        var username = req.query.username;
        console.log("Username"+ username);
        model
            .userModel
            .findUserByUsername(username)
            .then(function (users) {
                if(users.length >0){
                    res.send(users[0]);
                }else {
                    res.send("0");
                }
                },function (error) {
                    res.sendStatus(400).send(error);
                }
            );

    }

    function findUserById(req,res){
        var userId = req.params.uid;
        console.log( "in find:" + userId);
       model
           .userModel
           .findUserById(userId)
           .then(function (user) {
               if(user){
                   res.send(user);
               }else{
                   res.send(null);
               }
               },function (error) {
                   res.sendStatus(400).send(error);
               }
           );

    }
};