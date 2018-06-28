app.controller("userCtrl", [ "$state", "$scope", "$window", "$http","userFactory",
                             function($state, $scope, $window, $http, userFactory) {

	$scope.user = {};
	
	$scope.securityQuestions = ["What is you Favourite Sport", "Which is your birth place", "Which is your desired destination","What is the name of your pet","What is your nickname" ,"What is your maidens Name"];

	// create users
	$scope.createUserDetails = function() {
		console.log($scope.user);
		userFactory.createUser($scope.user).then(function(response) {
			$scope.users = JSON.stringify(response);
		}, function(error) {
			$scope.status = 'Error retrieving customers! ' + error.message;
		})

	}

	// Get all users
	getUsers = function() {
		userFactory.getAllUser().then(function(response) {
			$scope.users = JSON.stringify(response);
			console.log($scope.users);
		}, function(error) {
			$scope.status = 'Error retrieving customers! ' + error.message;
		})

	}

	getUsers();

} ])