module.exports = function(app,model) {

    console.log("hello from user service");

    var cookieParser = require('cookie-parser');
    var session      = require('express-session');
    var passport = require('passport');
    app.use(cookieParser());
    app.use(session({
        // secret: process.env.APP_SECRET_KEY,
        secret:"this is project secret",
        resave: true,
        saveUninitialized: true
    }));

    app.use(passport.initialize());
    app.use(passport.session());
    var LocalStrategy = require('passport-local').Strategy;
    passport.use('project',new LocalStrategy(localStrategyProject));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


    app.post('/api/project/user',createUser);
    app.put('/api/project/user/:uid',updateUser);
    app.get('/api/project/user',findUser);
    app.get('/api/project/user/:uid',findUserById);
    app.put('/api/project/user/:uid',updateUser);
    app.delete('/api/project/user/:uid',deleteUser);
    app.post('/api/project/login', passport.authenticate('project'), login);
    app.post('/api/project/checkLoggedin',checkLoggedin);
    app.post('/api/project/logout', logout);

    app.get('/auth/project/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get('/auth/project/google/callback',
        passport.authenticate('google', {
            successRedirect: '/project/#/user',
            failureRedirect: '/project/#/login'
        }));

    var googleConfig = {
        clientID     : process.env.GOOGLE_CLIENT_ID,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL  : process.env.GOOGLE_CALLBACK_URL
    };

    passport.use('google', new GoogleStrategy(googleConfig, googleStrategy));


    function googleStrategy(token, refereshToken, profile, done) {
        console.log("google profile "+profile);
        model.userModel
            .findGoogleUser(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return model.userModel.createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }



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

    function localStrategyProject(username,password,done) {
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
       // console.log(req);



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
                        console.log("No user");
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
                    console.log("users");
                    console.log(users[0]);
                    res.send(users[0]);
                }else {
                    console.log("No user");
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