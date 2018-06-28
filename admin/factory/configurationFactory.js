app.factory('configurationFactory', [
		'$http',
		function($http) {

			// var urlBase = 'http://18.188.172.194:8989/domo/';
			var configurationfac = {};

			// Create configuration
			configurationfac.createConfiguration = function(configuration) {
				var body = JSON.stringify(configuration)
				return $http.post(
						'http://18.188.172.194:8989/domo/create_config/', body)
						.then(function(response) {
							return response.data;
						}, function(errResponse) {
							return errResponse.data;
						});

			}
			

			// Run continous config instances
			// Create configuration
			configurationfac.runConfigInfinteLoop = function(runInfinteConfig) {
				 var body = runInfinteConfig
				console.log(body + "Testing");
				return $http.post(
						'http://18.188.172.194:8989/domo/updateSchedule/',
						body).then(function(response) {
					return response.data;
				}, function(errResponse) {
					return errResponse.data;
				});
			}
			
			//Read batch Schedule
			configurationfac.readScheduleDetails = function(schedule) {
				// var body = JSON.stringify(configuration)
				return $http.post(
						'http://18.188.172.194:8989/domo/readSchedule/',
						schedule).then(function(response) {
					return response.data;
				}, function(errResponse) {
					return errResponse.data;
				});
			}

			// read configuration for SAP BY DESIGN to DOMO
			configurationfac.readConfiguration = function(config) {
				 var body = JSON.stringify(config);
				return $http.post(
						'http://18.188.172.194:8989/domo/readConfig/', body)
						.then(function(response) {
							//alert(response.data + "Success");
							return response.data;
						}, function(errResponse) {
						 //alert(errResponse.data + "Error Occured")
							return errResponse.data;
						});
			}
			
			/*// read configuration for SAP C4C to DOMO
			configurationfac.readSapC4C = function(config) {
				// var body = JSON.stringify(config);
				return $http.post(
						'18.188.172.194:8989/domo/readConfig/', config)
						.then(function(response) {
							// alert(response.data + "Success");
							return response.data;
						}, function(errResponse) {
							// alert(errResponse.data + "Error Occured")
							return errResponse.data;
						});
			}*/


			// update configuration
			configurationfac.updateConfiguration = function(configuration) {
				return $http.post(
						'http://18.188.172.194:8989/domo/updateConfig/',
						configuration).then(function(response) {
					return response.data;
				}, function(errResponse) {
					return errResponse.data;
				});

			}

			// view Logs for configurations
			configurationfac.viewLogs = function(config) {
				// var body = JSON.stringify(config);

				return $http
						.post('http://18.188.172.194:8989/domo/readUserLogs/',
								config).then(function(response) {
							// alert(response.data + "Success");
							return response.data;
						}, function(errResponse) {
							return errResponse.data;
						});
			}

			// disableButton
			configurationfac.disableConfig = function(config) {
				// var body = JSON.stringify(config);
				return $http.post(
						'http://18.188.172.194:8989/domo/disableConfig/',
						config).then(function(response) {
					return response.data;
				}, function(errResponse) {
					return errResponse.data;
				});

			}

			// Sending the contact us query
			configurationfac.contactus = function(query) {
				return $http.post(
						'http://18.188.172.194:8989/domo/getInTouch/', query)
						.then(function(response) {
							return response.data;
						}, function(errResponse) {
							return errResponse.data;
						});
			}

			// Run configuration
			configurationfac.runConfiguration = function(config) {
				// var body = JSON.stringify(config);
				return $http.post(
						'http://18.188.172.194:8989/domo/domo_upload/', config)
						.then(function(response) {
							return response.data;
						}, function(errResponse) {
							return errResponse.data;
						});

			}

			return configurationfac;

		} ]);