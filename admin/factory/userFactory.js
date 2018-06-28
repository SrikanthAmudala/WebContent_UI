app.factory('userFactory', [
		'$http',
		function($http) {

			var userfac = {};

			//Create user
			userfac.createUser = function(user) {
				var body = JSON.stringify(user)
				return $http.post(
						'http://18.188.172.194:8989/domo/create_user/', body)
						.then(function(response) {
							return response.data;
						}, function(errResponse) {
							return errResponse.data;
						});

			}

			//get all user
			userfac.getAllUser = function() {
				//alert("User factory")
				return $http.get('http://18.188.172.194:8989/domo/readUsers/')
						.then(function(response) {
							alert(response.data + "Response")
							return response.data;
						}, function(errResponse) {
							return errResponse.data;
						});

			}

			return userfac;

		} ]);