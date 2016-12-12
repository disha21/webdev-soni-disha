module.exports = function(app,model) {

    console.log("hello from user service");
    var cookieParser = require('cookie-parser');
    var session      = require('express-session');
    var passport = require('passport');
    app.use(cookieParser());
    app.use(session({
        // secret: process.env.APP_SECRET_KEY,
        secret:"this is assignment secret",
        resave: true,
        saveUninitialized: true
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    var LocalStrategy = require('passport-local').Strategy;

    passport.use('assignment', new LocalStrategy(localStrategyAssignment));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
    var FacebookStrategy = require('passport-facebook').Strategy;

    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : "http://localhost:3000/auth/assignment/facebook/callback"
    };

    var bcrypt = require("bcrypt-nodejs");

    app.get ('/auth/assignment/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/assignment/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/assignment/#/user',
            failureRedirect: '/assignment/#/login'
        }));


    passport.use('facebook', new FacebookStrategy(facebookConfig, facebookStrategy));


    app.post('/api/user',createUser);
    app.put('/api/user/:uid',updateUser);
    app.get('/api/user',findUser);
    app.get('/api/user/:uid',findUserById);
    app.put('/api/user/:uid',updateUser);
    app.delete('/api/user/:uid',deleteUser);
    app.post('/api/login', passport.authenticate('assignment'), login);
    app.post('/api/checkLoggedin',checkLoggedin);
    app.post('/api/logout', logout);
    app.post('/api/register',register);


    function register (req, res) {
        var user = req.body;
        console.log("user server");
        console.log(user);
        user.password = bcrypt.hashSync(user.password);
        model
            .userModel
            .createUser(user)
    .then(
            function(user){
                if(user){
                    req.login(user, function(err) {
                        if(err) {
                            res.status(400).send(err);
                        } else {
                            res.json(user);
                        }
                    });
                }
            }
        );
    }


    function logout(req, res) {
        req.logout();
        res.send(200);
    }

    function checkLoggedin(req,res){
        // console.log("Assignment: " + req);
        console.log(req)

        res.send(req.isAuthenticated() ? req.user : '0');

    }

    /*req.isAuthenticated = function() {
        var property = 'user';
        if (this._passport && this._passport.instance) {
            property = this._passport.instance._userProperty || 'user';
        }

        return (this[property]) ? true : false;
    };*/

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

    function localStrategyAssignment(username,password,done) {
        console.log("username + password");
        console.log(username + password);
        model
            .userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
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


    function facebookStrategy(token, refreshToken, profile, done) {
        console.log(profile);
        model.userModel
            .findUserByFacebookId(profile.id)
            .then(
                function (fbuser) {
                    if (fbuser) {
                        return done(null, fbuser);
                    }
                    else {
                        fbuser = {
                            username: profile.displayName.replace(/ /g, ''),
                            facebook: {
                                token: token,
                                id: profile.id,
                                displayName: profile.displayName
                            }
                        };
                        return model.userModel
                            .createUser(fbuser);

                    }
                }
            )
            .then(
                function (user) {
                    done(null, user);
                }
            );

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
        console.log("hello from find user api");
        var params = req.params;
        var query = req.query;
       // console.log(req);
        console.log(params);
        console.log(query);


        if(query.username && query.password){
            findUserByCredentials(req,res);
        }else if(query.username){
            console.log("findUserByUsername");
            findUserByUsername(req,res);
        }else{
            res.json(req.user);
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
            .then(function (user) {
                if(user){
                    console.log("in findUserByUsername");
                    console.log(user);
                    res.send(user);
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