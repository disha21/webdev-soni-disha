module.exports = function(app) {

    console.log("hello from user service");

    var users = [
        {_id: 123, username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
        {_id: 234, username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
        {_id: 345, username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
        {_id: 456, username: "disha", password: "disha", firstName: "Disha", lastName: "Soni"}
    ];

    app.post('/api/user',createUser);
    app.put('/api/user/:uid',updateUser);
    app.get('/api/user',findUser);
    app.get('/api/user/:uid',findUserById);
    app.put('/api/user/:uid',updateUser);
    app.delete('/api/user/:uid',deleteUser);

    function createUser(req,res) {
        console.log("in create");
        var user = req.body;
        user._id = (new Date().getTime()).toString();
        users.push(user);
        res.send(user);

    }

    function updateUser(req,res) {
        console.log("in update server");
        var user = req.body;
        var uid = req.params.uid;
        for(var u in users) {
            if(users[u]._id == uid) {
                users[u] = user;
                res.sendStatus(200);
                return;
            }
        }
        res.send(400);
    }

    function deleteUser(req,res) {
        var uid = req.params.uid;
        for(var u in users) {
            if(users[u]._id == uid) {
                users.splice(u, 1);
            }
        }
        res.send(200);
    }


    function findUser(req,res) {
        console.log("hello from api");
        var params = req.params;
        var query = req.query;
       // console.log(req);
        //console.log(params);
        //console.log(query);


        if(query.username && query.password){
            findUserByCredentials(req,res);
        }else if(query.username){
            findUserByUsername(req,res);
        }

    }

    function findUserByCredentials(req,res){
        var username = req.query.username;
        var password = req.query.password;
        for(var u in users) {
            if(users[u].username === username &&
                users[u].password === password) {
                res.send(users[u]);
                return;
            }
        }
        res.send('0');
    }

    function findUserByUsername(req,res){
        var username = req.query.username;
        for(var u in users) {
            if(users[u].username === username) {
                res.send(users[u]);
                // return;
            }
        }
        res.send("0");
    }

    function findUserById(req,res){
        var userId = req.params.uid;
        console.log( "in find:" + userId);
       for(user in users){
            if(users[user]._id == userId){
                res.send(users[user]);
                return;
            }
        }


    }
};