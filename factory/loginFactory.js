app.factory('loginFactory', [
		'$cookies',
		'$http',
		'$state',
		'$rootScope',
		'$q',
		'$window',
		function($cookies, $http, $state, $rootScope, $q, $window) {

			var loginfac = {};

			// Login Authentication
			loginfac.signDetails = function(login) {

				return $http.post('http://18.188.172.194:8989/domo/login/',
						login).then(
						function(response) {

							var currentUser = {
								userID : login.userID
							}
							// store the object value with default path
							$cookies.putObject('data', currentUser, {
								path : '/'
							});
							// access object value
							// console.log($cookies.getObject('data'));

							if (response.data.result == 'Login Success') {
								// access object value
								$rootScope.currentLoggedUser = $cookies
										.getObject('data');
								// Routing
								$window.location.href = 'admin/index.html';
								// var userObj =
								// $cookies.getObject("currentUser");

								/*
								 * if (angular.isUndefined(userObj)) { } else {
								 * $state.go("index.tml"); }
								 */
							} else {
								return response.data.result;
							}
							// return response.data;
						}, function(errResponse) {
							return errResponse.data;
						});

			}

			// Sending the contact us query
			loginfac.contactus = function(query) {
				return $http.post('http://18.188.172.194:8989/domo/getInTouch/', query).then(function(response) {
					return response.data;
				}, function(errResponse) {
					return errResponse.data;
				});
			}

			// Validating security question aganist given userID

			loginfac.secQuestion = function(secQuestion) {
				// var body = JSON.stringify(secQuestion)
				return $http.post(
						'http://18.188.172.194:8989/domo/secQuestion/',
						secQuestion).then(function(response) {
					return response.data;
				}, function(errResponse) {
					return errResponse.data;
				});

			}

			// Validating security answer for the given security
			// question
			loginfac.secAnswer = function(answer) {

				return $http.post(
						'http://18.188.172.194:8989/domo/secAnsValidation/',
						answer).then(function(response) {
					return response.data;
				}, function(errResponse) {
					return errResponse.data;
				});

			}

			// Update the New password
			loginfac.updatePassword = function(newPassword) {
				// var body = JSON.stringify(newPassword);
				return $http.post(
						'http://18.188.172.194:8989/domo/updatePassword/',
						newPassword).then(function(response) {
					return response.data;
				}, function(errResponse) {
					return errResponse.data;
				});

			}

			return loginfac;

		} ]);