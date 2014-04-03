angular.module('logs', [])
    .controller('logCtrl', function($scope, $http) {
        $scope.logs = [];

        $scope.init = function() {
            $http.get('/json/logs')
                .success(function(data) {
                    $scope.logs = data;
                    console.log($scope.logs);
                })
                .error(function(data) {
                    console.error('Error: ' + data);
                });
        };

        $scope.paf = function() {
            $http.get('/json/logs')
                .success(function(data) {
                    $scope.logs = data;
                    console.log($scope.logs);
                })
                .error(function(data) {
                    console.error('Error: ' + data);
                });
        }

        $scope.init();
    });