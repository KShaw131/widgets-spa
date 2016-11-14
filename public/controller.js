var widgetModule = angular.module('widgetModule', ['ngRoute']);

//Routes configuration
  widgetModule.config(function($routeProvider) {
      $routeProvider

          // routes
          .when('/', {
              templateUrl : 'dashboard.html'
          })
          .when('/user', {
              templateUrl : 'user.html'
          })
          .when('/widget', {
              templateUrl : 'widget.html'
          })
          .when('/userDetails', {
              templateUrl : 'userDetails.html'
          })
          .when('/widgetDetails', {
              templateUrl : 'widgetDetails.html'
          });
  });

widgetModule.controller('mainController', function($scope, $http, $location, $route) {

  $scope.createWidget = false;
  $scope.editWidget = false;

  //arrays used to store json objects
  $scope.users = {};
  $scope.widgets = {};
  $scope.foundUser = {};
  $scope.foundWidget = {};

  //ng-show functionality-----------------------------------------

  $scope.showWidgetCreate = function() {
    $scope.createWidget = true;
  }

  $scope.showWidgetEdit = function() {
    $scope.editWidget = true;
  }

  $scope.cancelCreating = function() {
    $scope.createWidget = false;
  }

  $scope.cancelEditing = function() {
    $scope.editWidget = false;
  }

  // initial api call to populate user and widget arrays
  $scope.initialize = function() {
    $http.get('/api/users')
      .success(function(data) {
        $scope.users = data;
      })
      .error(function(data) {
        console.log('Error: ' + data);
    });

    $http.get('/api/widgets')
      .success(function(data) {
        $scope.widgets = data;
      })
      .error(function(data) {
        console.log('Error: ' + data);
    });

  };

  //refresh list after creating/editing widgets
  $scope.getWidgets = function() {
    $http.get('/api/widgets')
      .success(function(data) {
        $scope.widgets = data;
      })
      .error(function(data) {
        console.log('Error: ' + data);
    });
  };

  // Find user with user id
  $scope.findUserDetails = function(id) {
    $http.get('/api/users/' + id)
      .success(function(data) {
        $location.path('/userDetails');
        $scope.foundUser = data;
      })
      .error(function(data) {
        console.log('Error: ' + data);
    });

  };

  // Find widget with widget id
  $scope.findWidgetDetails = function(id) {
    $http.get('/api/widgets/' + id)
      .success(function(data) {
        $location.path('/widgetDetails');
        $scope.foundWidget = data;
      })
      .error(function(data) {
        console.log('Error: ' + data);
    });

  };

  // Create new widget
  $scope.createNewWidget = function(newWidget) {
    $http.post('/api/widgets', newWidget)
      .success(function(data) {
        $scope.getWidgets();
        $scope.cancelCreating();
      })
      .error(function(data) {
        console.log('Error: ' + data);
    });

  };

  //Edit widget
  $scope.updateWidget = function(editedWidget) {
    $http.put('/api/widgets/' + editedWidget.id, editedWidget)
      .success(function(data) {
        $scope.getWidgets();
        $scope.cancelEditing();
      })
      .error(function(data) {
        console.log('Error: ' + data);
    });

  };

});
