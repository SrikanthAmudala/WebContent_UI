app
		.controller(
				"configurationCtrl",
				[
						"$state",
						"$scope",
						"$window",
						"$http","$cookies",
						"configurationFactory",
						function($state, $scope, $window, $http,$cookies,
								configurationFactory) {
							
							$scope.currentLoggedUser = $cookies.getObject('data')

							// Display configuration
							$scope.displayConfiguration = function() {

								$scope.config = {
									userID : 'Maninder'
								}

								configurationFactory
										.readConfiguration($scope.config)
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

							//displayConfiguration();

							// create configuration
							$scope.createConfig = function() {

								configurationFactory
										.createConfiguration(
												$scope.configuration)
										.then(
												function(response) {
													$scope.insertConfig = JSON.stringify(response);
													console.log($scope.insertConfig);
												},
												function(error) {
													$scope.status = 'Error retrieving customers! '
															+ error.message;
												})

							}

							// update configuration
							$scope.updateConfig = function() {

								configurationFactory
										.updateConfiguration(
												$scope.configuration,
												$scope.userID)
										.then(
												function(response) {
													console.log(response);
													$scope.updateConfig = response;
												},
												function(error) {
													$scope.status = 'Error retrieving customers! '
															+ error.message;
												})

							}

							// view logs for the configuration
							viewConfigLogs = function() {

								$scope.config = {
									userID : 'SUNNY'
								}

								configurationFactory
										.viewLogs($scope.config)
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

							viewConfigLogs();

							// Run configuration
							$scope.runConfig = function() {

								$scope.config={
										userID:'SUNNY',
										service_name:'Sales Order Volume'
								}
								configurationFactory
										.runConfiguration($scope.config)
										.then(
												function(response) {
													$scope.displayConfig = JSON.stringify(response);
													console.log($scope.displayConfig);
												},
												function(error) {
													$scope.status = 'Error retrieving customers! '
															+ error.message;
												})

							}

							// Disable the configuration
							$scope.disableConfiguration = function() {
								
								$scope.config = {
										userID : 'Bandana',
										dataset_name :'Investment Banking Volume'
								}
								configurationFactory
										.disableConfig($scope.config)
										.then(
												function(response) {
													$scope.displayConfig = JSON.stringify(response);
													console.log($scope.displayConfig)
												},
												function(error) {
													$scope.status = 'Error retrieving customers! '
															+ error.message;
												})

							}

						} ])