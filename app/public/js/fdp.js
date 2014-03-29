angular.module('fdp', [])
	.controller('fdpCtrl', function($scope, $http) {
		$scope.files = [];
		$scope.pc = [];
		$scope.selectedFile = '';

		$scope.init = function() {
			$http.get('/json/fdp')
				.success(function(data) {
					$scope.files = data;
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});
		};

		$scope.nbFdP = function() {
			return $scope.files.length;
		}

		$scope.getTplName = function() {
			return $scope.pc.template;
		}

		$scope.isFileSelected = function(file) {
			return file == $scope.selectedFile;
		}

		$scope.displayFile = function(filename) {
			$http.get('/json/fdp/' + filename)
				.success(function(data) {
					$scope.pc = data;
					$scope.selectedFile = filename;
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});
		}

		$scope.init();
	});