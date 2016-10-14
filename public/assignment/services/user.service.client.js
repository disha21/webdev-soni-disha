/**
 * Created by dishasoni on 10/10/16.
 */


(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);


    function UserService() {
        var users = [
            {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
            {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
            {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
        ];

        var api = {
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            updateUser: updateUser,
            deleteUser: deleteUser,
            createUser: createUser,
            findUserByUsername: findUserByUsername
        };

        return api;

        function findUserByCredentials(username, password) {
            console.log("hello");
            for (var user in users) {
                console.log(users[user] + username);
                console.log("in for");
                if (users[user].username === username && users[user].password === password) {
                    console.log("in if");
                    return users[user];
                }


            }
            return null;

        }

        function createUser(newUser) {
                console.log(findUserByUsername(newUser.username));
                if (findUserByUsername(newUser.username) !== null) {
                    console.log("User already registered");
                    return false;
                } else {
                    console.log("1... " + users);
                    var lastUser = users[users.length - 1];
                    var user_id = lastUser._id +1;
                    console.log(users);
                    users.push(newUser);
                    console.log(users);
                    return true;
                }

            }

         function findUserById(userid) {
             for (var user in users) {
                 if (users[user]._id === userid) {
                     return users[user];
                 }
             }
             return null;

         }
         function findUserByUsername(username) {
             for (var user in users) {
                 if (users[user].username === username) {
                     return users[user];
                 }
             }
             return null;
         }



         function updateUser(userId, newUser) {
             for (var user in users) {
                 if (users[user]._id === userid) {
                     users[user].firstName = newUser.firstName;
                     users[user].lastName = newUser.lastName;
                     return true;
                 }
             }
             return false;

         }
         function deleteUser(userId) {
             for (var user in users) {
                 if (users[user]._id === userId) {
                     users.splice(user, 1);
                     break;
                 }
             }


         }

    }
})();

