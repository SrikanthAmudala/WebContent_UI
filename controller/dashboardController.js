app.controller("dashboardCtrl", [ "$state", "$scope", "$cookies", "$window",
		"$http", "dashboardFactory",
		function($state, $scope, $cookies, $window, $http, dashboardFactory) {

			$scope.currentUser = $cookies.getObject('data');
			console.log($scope.curretnUser);

		} ])