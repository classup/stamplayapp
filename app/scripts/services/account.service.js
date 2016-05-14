angular.module("classupApp")
.factory("AccountService", ["$q", "$http", "$stamplay", function($q, $http, $stamplay) {
    return {
        login : function(user) {
            var q = $q.defer();
            console.log(user.username);
            var cbUser = new CB.CloudUser();
            cbUser.set('username', user.username);
            cbUser.set('password', user.password);
            cbUser.logIn({
            success: function(user) {
                console.log(CB.CloudUser.current);
                q.resolve(user);
                console.log('login successful');
            },
            error: function(err) {
                q.reject(err);
                console.log('error in login ' + err );
            }
            });
            /*$stamplay.User.login(user)
                .then(function(res){
                    q.resolve(res);
                    console.log('login successful');
                },function(err){
                    q.reject(err);
                    console.log('error in login ' + err );
                });*/
                return q.promise;
        },
        signup : function(user){
            console.log(user);
            var q = $q.defer();
            var roles = new CB.CloudRole("registered");
            var cbUser = new CB.CloudUser();
            cbUser.set('firstName', user.firstName);
            cbUser.set('lastName', user.lastName);
            cbUser.set('username', user.username);
            cbUser.set('password', user.password);
            cbUser.set('email', user.email);
            cbUser.set('phoneNumber', user.phoneNumber);
            
            cbUser.signUp({
            success: function(user) {
                console.log("user signed up successfully");
                console.log(CB.CloudUser.current);
                CB.CloudUser.current.addToRole(roles,{
                    success: function(user) {
                        console.log(user);
                        q.resolve(user);
                        console.log('role successful');
                    },
                    error: function(err) {
                        console.log('error in role ' + err );
                        q.reject(err);
                    }
                })
                
            },
            error: function(err) {
                 q.reject(err);
                console.log('error in signup ' + err );
            }
            });
            return q.promise;
        },
        logout :function(){
            var q = $q.defer();
            CB.CloudUser.current.logOut({
            success: function(user) {
            q.resolve(user);
            },
            error: function(err) {
            q.reject(err);
            }
        });
            return q.promise;
        },
       /* logout : function() {
            // SWITCH TO GITHUB
            //$stamplay.User.logout();

            CB.CloudUser.current.logOut({
            success: function(user) {
            //log out successfull
            },
            error: function(err) {
            //Error occured in user registration.
            }
        });
        },*/
        currentUser : function() {
            var q = $q.defer();

            var currentUser = CB.CloudUser.current;
            if(currentUser != null){
                q.resolve(currentUser);
                
            }
            else{
                q.reject(false);
            }
            return q.promise;
           /* $stamplay.User.currentUser()
            .then(function(res) {
                if(res.hasOwnProperty("user")) {
                    var user = res.user;
                    $stamplay.User.getRole(res.user.givenRole)
                    .then(function(res) {
                        user.givenRole = res;
                        q.resolve(user);
                    })
                } else {
                    q.reject(false);
                }

            })
            return q.promise;*/
        }
    }
}])