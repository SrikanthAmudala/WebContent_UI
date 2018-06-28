app.factory('configurationFactory', [
		'$http',
		function($http) {

			//var urlBase = 'http://18.188.172.194:8000/domo/';
			var configurationfac = {};

			//Create configuration
			configurationfac.createConfiguration = function(configuration) {
				var body = JSON.stringify(configuration)
				return $http.post(
						'http://18.188.172.194:8000/domo/create_config/', body)
						.then(function(response) {
							return response.data;
						}, function(errResponse) {
							return errResponse.data;
						});

			}

			//read configuration
			configurationfac.readConfiguration = function(config) {
				var body = JSON.stringify(config);
				return $http.post('http://18.188.172.194:8000/domo/readConfig/',
						body).then(function(response) {
					//alert(response.data + "Success");
					return response.data;
				}, function(errResponse) {
					//alert(errResponse.data + "Error Occured")
					return errResponse.data;
				});
			}

			//update configuration
			configurationfac.updateConfiguration = function(configuration) {
				return $http.post(
						'http://18.188.172.194:8000/domo/updateConfig/',
						configuration).then(function(response) {
					return response.data;
				}, function(errResponse) {
					return errResponse.data;
				});

			}

			//view Logs for configurations
			configurationfac.viewLogs = function(config) {
				var body = JSON.stringify(config);

				return $http.post(
						'http://18.188.172.194:8000/domo/readUserLogs/', body)
						.then(function(response) {
							//alert(response.data + "Success");
							return response.data;
						}, function(errResponse) {
							return errResponse.data;
						});
			}

			//disableButton
			configurationfac.disableConfig = function(config) {
				var body = JSON.stringify(config);
				return $http.post(
						'http://18.188.172.194:8000/domo/disableConfig/', body)
						.then(function(response) {
							return response.data;
						}, function(errResponse) {
							return errResponse.data;
						});

			}

			//Run configuration
			configurationfac.runConfiguration = function(config) {
				var body = JSON.stringify(config);
				return $http.post(
						'http://18.188.172.194:8000/domo/domo_upload/', body)
						.then(function(response) {
							return response.data;
						}, function(errResponse) {
							return errResponse.data;
						});

			}

			return configurationfac;

		} ]);