app.controller("homeController", [
		"$state",
		"$scope",
		"$window",
		"$http",
		"$location",
		"$cookies",
		"loginFactory",
		function($state, $scope, $window, $http, $location, $cookies,
				loginFactory) {

			$scope.user = loginFactory.getUser()
			$scope.userID = $scope.user.userID;

			var userDataObj = $cookies.getObject("userObj");

		} ]);

app
		.controller(
				"loginCtrl",
				[
						"$state",
						"$cookies",
						"$scope",
						"$window",
						"$http",
						"$location",
						"loginFactory",
						function($state, $cookies, $scope, $window, $http,
								$location, loginFactory) {

							/*checkLoggedUser = function() {
								alert("INside")
								if ($cookies.getObject('data') == null
										|| $cookies.getObject('data') == undefined) {
									$window.location.href = '../index.html';
								}
							}

							checkLoggedUser();
							
							// Clear the cookie on logout of the application
							$scope.clearCookies = function() {
								$cookies.remove('data', {
									path : '/'
								});
								$window.location.href = '../index.html';
							}*/

							$scope.currentUser = $cookies.getObject('data');
							// Getting current logged user from cookies
							var userObj = $cookies.getObject('data');
							var arr = Object.values(userObj);
							str1 = arr.join("");
							$scope.currentLoggedUser = str1;

							// Login Credentials
							$scope.loginUser = function() {

								loginFactory
										.signDetails($scope.login)
										.then(
												function(response) {
													$scope.loggedUser = response;
													setInterval(function() {

														$scope.loggedUser = "";
														$scope.$apply();
													}, 5000);
												},
												function(error) {
													$scope.status = 'Error retrieving customers! '
															+ error.message;
												})
							}

							// Authenticating Security Question for given UserID
							securityQuestion = function() {

								$scope.secQuestion = {
									userID : 'SUNNY'
								}

								loginFactory
										.secQuestion($scope.secQuestion)
										.then(
												function(response) {
													$scope.question = response;
													console
															.log($scope.question.result);
												},
												function(error) {
													$scope.status = 'Error retrieving customers! '
															+ error.message;
												})

							}

							securityQuestion();

							// Authenticating security answer for the given
							// security question
							$scope.securityAnswer = function() {

								loginFactory
										.secAnswer($scope.userID,
												$scope.security_ans)
										.then(
												function(response) {
													console.log(response);
													$scope.displayConfig = response;
												},
												function(error) {
													$scope.status = 'Error retrieving customers! '
															+ error.message;
												})

							}

							// Updating the forgot password
							$scope.userPasswordUpdate = function() {

								loginFactory
										.updatePassword($scope.newPassword)
										.then(
												function(response) {
													$scope.changed = response;
													console
															.log($scope.changed.result);
												},
												function(error) {
													$scope.status = 'Error retrieving customers! '
															+ error.message;
												})
							}

						} ])