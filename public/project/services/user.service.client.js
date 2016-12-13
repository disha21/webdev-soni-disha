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
            logout:logout,
            getUserProfile:getUserProfile,
            follow :follow,
            unfollow:unfollow
        };

        return api;

        function unfollow(userId,toFollowUserUsername){
            var url = '/api/project/user/'+ userId+ '/unfollow/' +toFollowUserUsername;
            return $http.delete(url);
        }


        function follow(userId,toFollowUserUsername){
            console.log("in follow");
            var url = '/api/project/user/'+ userId+ '/follow/' +toFollowUserUsername;
            return $http.post(url);
        }

        function getUserProfile(userId,toViewUserUsername) {
            var url = '/api/project/user/'+ userId+ '/profile/' +toViewUserUsername;
           return $http.get(url);
        }

        function logout() {
            return $http.post("/api/project/logout");
        }


        function checkLoggedin () {
            return $http.post("/api/project/checkLoggedin");
        }

        function login(username,password) {
            var user = {
                username :username,
                password:password
            };

            return $http.post("/api/project/login",user);

        }

        function findUserByCredentials(username, password) {
            console.log(findUserByCredentials);
            console.log(username + password );
            var url = '/api/project/user?username='+ username+ '&password=' +password;
            return $http.get(url);


        }

        function createUser(newUser) {
            var user = {
                username: newUser.username,
                password: newUser.password
            };

            return $http.post('/api/project/user', user);
        }
         function findUserById(userid) {
             var url = '/api/project/user/'+ userid;
             return $http.get(url);

         }

         function findUserByUsername(username) {
             var url = '/api/project/user?username='+ username;
             return $http.get(url);
         }

         function updateUser(newUser) {

            var url = '/api/project/user/'+ newUser._id;
             return $http.put(url,newUser);
             console.log("in service");
             console.log(newUser);

         }

         function deleteUser(userId) {
             var url = '/api/project/user/'+ userId;
            return $http.delete(url);
         }

    }
})();

