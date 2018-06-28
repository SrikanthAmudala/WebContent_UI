app
		.controller(
				"securityQuestionCtrl",
				[
						"$state",
						"$scope",
						"$window",
						"$http",
						"$location",
						"loginFactory",
						function($state, $scope, $window, $http, $location,
								loginFactory) {

							// Authenticating Security Question for given UserID
							$scope.securityQuestion = function() {

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