/**
 * Created by dishasoni on 10/10/16.
 */


(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);


    function UserService($http) {


        var api = {
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            updateUser: updateUser,
            deleteUser: deleteUser,
            createUser: createUser,
            findUserByUsername: findUserByUsername,
            findUserByUsername: findUserByUsername,
            login:login,
            checkLoggedin:checkLoggedin,
            logout:logout,
            register: register
        };

        return api;

        function logout() {
            return $http.post("/api/logout");
        }

        function register(newUser) {
            console.log("in register service");
            return $http.post("/api/register",newUser);
        }


        function checkLoggedin () {
            console.log("in checked");
            return $http.post("/api/checkLoggedin");
        }

        function login(username,password) {
            var user = {
                username :username,
                password:password
            };

            return $http.post("/api/login",user);

        }

        function findUserByCredentials(username, password) {
            /*console.log("hello");
            for (var user in users) {
                console.log(users[user] + username);
                console.log("in for");
                if (users[user].username === username && users[user].password === password) {
                    console.log("in if");
                    return users[user];
                }


            }
            return null;*/
            var url = '/api/user?username='+ username+ '&password=' +password;
            return $http.get(url);


        }

        function createUser(newUser) {
            var user = {
                username:newUser.username,
                password: newUser.password
            };

            return $http.post('/api/user',user);
            /*
                console.log(findUserByUsername(newUser.username));
                if (findUserByUsername(newUser.username) !== null) {
                    console.log("User already registered");
                    return null;
                } else {
                    console.log("1... " + users);
                    var lastUser = users[users.length - 1];
                    var user_id = lastUser._id +1;
                    console.log(user_id );
                    var newUserObject =  {_id: user_id,
                        username:newUser.username ,
                        password: newUser.password,
                        firstName: "",
                        lastName: ""
                    };
                    console.log(newUserObject);
                    users.push(newUserObject);
                    return newUserObject;
                }
*/
            }

         function findUserById(userid) {
             var url = '/api/user/'+ userid;
             return $http.get(url);

         }

         function findUserByUsername(username) {
            /* for (var user in users) {
                 if (users[user].username === username) {
                     return users[user];
                 }
             }
             return null;*/
            console.log("in service" +username );

             var url = '/api/user?username='+ username;
             return $http.get(url);
         }

         function updateUser(newUser) {

            var url = '/api/user/'+ newUser._id;
             $http.put(url,newUser);
             console.log("in service");
             console.log(newUser);

         }

         function deleteUser(userId) {
            /* for (var user in users) {
                 if (users[user]._id === userId) {
                     users.splice(user, 1);
                     break;
                 }
             }*/

             var url = '/api/user/'+ userId;

            return $http.delete(url);
         }

    }
})();

