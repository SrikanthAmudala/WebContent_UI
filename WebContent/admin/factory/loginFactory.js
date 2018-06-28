app.factory('loginFactory', [
		'$cookies',
		'$http',
		'$state',
		'$rootScope',
		'$q','$window',
		function($cookies, $http, $state, $rootScope, $q,$window) {

			var loginfac = {};

			// Login Authentication
			loginfac.signDetails = function(login) {

				
				var body = JSON.stringify(login)
				
				return $http
						.post('http://18.188.172.194:8000/domo/login/', body)
						.then(function(response) {
							
							if (response.data.result == 'Login Success') {
								
								//	$window.sessionStorage["body"] = JSON.stringify(body);
								$window.location.href = 'admin/index.html';
								/*$scope.currentUser= $cookies.getObject("data");*/
								
								/*if (angular.isUndefined(userObj)) {
									
								} else {
									$state.go("index.tml");
								}*/
							} else {
								return response.data.result;
							}
							//return response.data;
						}, function(errResponse) {
							return errResponse.data;
						});

			}

			// Validating security question aganist given userID

			loginfac.secQuestion = function(secQuestion) {
				var body = JSON.stringify(secQuestion)
				return $http.post(
						'http://18.188.172.194:8000/domo/secQuestion/', body)
						.then(function(response) {
							return response.data;
						}, function(errResponse) {
							return errResponse.data;
						});

			}

			// Validating security answer for the given security
			// question
			loginfac.secAnswer = function(userID, security_ans) {

				return $htttp.post(
						'http://18.188.172.194:8000/domo/secAnsValidation/'
								+ userID + '/' + security_ans).then(
						function(response) {
							return response.data;
						}, function(errResponse) {
							return errResponse.data;
						});

			}

			// Update the New password
			loginfac.updatePassword = function(newPassword) {
				var body = JSON.stringify(newPassword);
				return $http.post(
						'http://18.188.172.194:8000/domo/updatePassword/', body)
						.then(function(response) {
							return response.data;
						}, function(errResponse) {
							return errResponse.data;
						});

			}

			return loginfac;

		} ]);