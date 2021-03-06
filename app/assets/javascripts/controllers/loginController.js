angular.module('battleship').controller('LoginController', ['$rootScope', '$scope', '$window', 'Auth', function LoginController($rootScope, $scope, $window, Auth) {

  $scope.createSession = function() {
    var credentials = {
      email: $scope.email,
      password: $scope.password
    };

    var config = {
      headers: {
        'X-HTTP-Method-Override': 'POST'
      }
    };

    Auth.login(credentials, config).then(function(player) {
      $scope.loginError = false;
      $window.location.href = '/';
    }, function(error) {
      $scope.loginError = error.data.error;
    });

  };

  $scope.destroySession = function() {
    var config = {
      headers: {
        'X-HTTP-Method-Override': 'DELETE'
      }
    };

    Auth.logout(config).then(function(oldUser) {
      $rootScope.isAuthenticated = Auth.isAuthenticated();
      $window.location.href = '/';
    }, function(error) {
      // console.log('error logging out of session');
      console.log(error);
    });
  };

  $scope.goToLogin = function() {
    $window.location.href = '/#/login';
  };

}]);
