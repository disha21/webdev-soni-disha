/**
 * Created by dishasoni on 10/10/16.
 */


(function () {
    angular
        .module("webdevProject")
        .factory("UserService", UserService);


    function UserService($http) {


        var api = {
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            updateUser: updateUser,
            deleteUser: deleteUser,
            createUser: createUser,
            findUserByUsername: findUserByUsername,
            login:login,
            checkLoggedin:checkLoggedin,
            logout:logout
        };

        return api;

        function logout() {
            return $http.post("/api/logout");
        }


        function checkLoggedin () {
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
            console.log(findUserByCredentials);
            console.log(username + password );
            var url = '/api/user?username='+ username+ '&password=' +password;
            return $http.get(url);


        }

        function createUser(newUser) {
            var user = {
                username: newUser.username,
                password: newUser.password
            };

            return $http.post('/api/user', user);
        }
         function findUserById(userid) {
             var url = '/api/user/'+ userid;
             return $http.get(url);

         }

         function findUserByUsername(username) {
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
             var url = '/api/user/'+ userId;
            return $http.delete(url);
         }

    }
})();

