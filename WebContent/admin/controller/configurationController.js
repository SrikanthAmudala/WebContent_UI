app
		.controller(
				"configurationCtrl",
				[
						"$state",
						"$scope",
						"$window",
						"$http",
						"$cookies",
						"configurationFactory",
						function($state, $scope, $window, $http, $cookies,
								configurationFactory) {

							$scope.text = 'email@example.com,email@gmail.com,mailId@designer.co.in';

							// Disabling back button on browser
							$(document).ready(function() {
								function disableBack() {
									window.history.forward()
								}
								window.onload = disableBack();
								window.onpageshow = function(evt) {
									if (evt.persisted)
										disableBack()
								}
							});

							// Toggle Password to show/hide.
							$(".toggle-password").click(function() {
								$(this).toggleClass("fa-eye fa-eye-slash");
								var input = $($(this).attr("toggle"));
								if (input.attr("type") == "password") {
									input.attr("type", "text");
								} else {
									input.attr("type", "password");
								}
							});

							checkLoggedUser = function() {
								if ($cookies.getObject('data') == null
										|| $cookies.getObject('data') == undefined) {
									alert("Unrestircted Access to URL.!! "
											+ "Please provide authentic credentials to Login")
									$window.location.href = '../index.html';
								}
							}

							checkLoggedUser();

							// Getting current logged user from cookies
							var userObj = $cookies.getObject('data');
							var arr = Object.values(userObj);
							str1 = arr.join("");
							$scope.currentLoggedUser = str1;

							// Clear the cookie on logout of the application
							$scope.clearCookies = function() {
								$cookies.remove('data', {
									path : '/'
								});
								$window.location.href = '../index.html';
							}

							// Display configuration
							displayConfiguration = function() {

								configurationFactory
										.readConfiguration(userObj)
										.then(
												function(response) {

													$scope.displayConfig = [ response ];
													$scope.errorConfig = response;
													var arr = Object
															.values($scope.errorConfig);
													str1 = arr.join("");
													var substringResult = str1
															.substring(0, 32);
													$scope.errorConfiguration = substringResult;
													console
															.log($scope.errorConfiguration);

												},
												function(error) {
													$scope.status = 'Error retrieving customers! '
															+ error.message;
												})

							}

							displayConfiguration();

							$scope.selectedConfiguraion = function(config) {
								// alert(JSON.stringify(config));
								config["userID"] = $scope.currentLoggedUser;
								$scope.selectedConfiguration = config;
							}

							// create configuration
							$scope.createConfig = function() {

								configurationFactory
										.createConfiguration(
												$scope.configuration)
										.then(
												function(response) {
													$scope.insertConfig = [ response ];
													displayConfiguration();
													setInterval(
															function() {

																$scope.insertConfig = "";
																$scope.$apply();
															}, 9000);
													$('form[name="createForm"]')
															.submit();
													$('input[type="text"]')
															.val('');
													$("input[type='password']")
															.val('');
												},
												function(error) {
													$scope.status = 'Error retrieving customers! '
															+ error.message;
												})

							}

							$scope.togglePassword = function() {
								var x = document
										.getElementById("passwordInput");
								if (x.type === "password") {
									x.type = "text";
								} else {
									x.type = "password";
								}
							}

							$scope.togglePasswordCreate = function() {
								var x = document.getElementById("password");
								if (x.type === "password") {
									x.type = "text";
								} else {
									x.type = "password";
								}
							}

							// update configuration
							$scope.updateConfig = function() {
								configurationFactory
										.updateConfiguration(
												$scope.selectedConfiguration)
										.then(
												function(response) {

													$scope.updateConfigResponse = [ response ];
													setInterval(
															function() {

																$scope.updateConfigResponse = "";
																$scope.$apply();
															}, 9000);
													/*
													 * $(
													 * 'form[name="updateForm"]')
													 * .submit();
													 * $('input[type="text"]')
													 * .val('');
													 */
													$('#updateModal').modal(
															'hide');
												},
												function(error) {
													$scope.status = 'Error retrieving customers! '
															+ error.message;
												})

							}

							// view logs for the configuration
							$scope.viewConfigLogs = function(config) {
								var runObj = config;
								userObj["dataset_name"] = runObj.dataset_name
								// alert(userObj);

								configurationFactory
										.viewLogs(userObj)
										.then(
												function(response) {
													$scope.viewLogs = [ response ];
													$scope.result = response;
													var arr = Object
															.values($scope.result);
													str1 = arr.join("");
													var substringResult = str1
															.substring(0, 18);
													$scope.errorViewLogs = substringResult;

													console
															.log($scope.errorViewLogs);
												},
												function(error) {
													$scope.status = 'Error retrieving customers! '
															+ error.message;
												})
							}

							// Read Batch schedule
							$scope.readSchedule = function() {

								$scope.batchSchedule = [];
								var userObj = $cookies.getObject('data');
								$scope.batchSchedule = userObj;

								configurationFactory
										.readScheduleDetails(
												$scope.batchSchedule)
										.then(
												function(response) {
													$scope.scheduleResponse = [ response ];
													console
															.log($scope.scheduleResponse);
													angular
															.forEach(
																	$scope.scheduleResponse,
																	function(
																			value,
																			key) {
																		// consol.log(value);
																		$scope.frequency = value.result.frequency;
																		$scope.from_date = value.result.from_date;
																		$scope.to_date = value.result.to_date;

																		console
																				.log($scope.frequency);
																		console
																				.log($scope.from_date);
																		console
																				.log($scope.to_date);
																		var fromdate = $scope.from_date
																		$scope.dateform = fromdate
																				.split(
																						"-")
																				.reverse()
																				.join(
																						"/");
																		var todate = $scope.to_date
																		$scope.dateto = todate
																				.split(
																						"-")
																				.reverse()
																				.join(
																						"/");
																		// Disabling
																		// Past
																		// Dates
																		// in
																		// calender
																		var today = new Date()
																				.toISOString()
																				.split(
																						'T')[0];
																		document
																				.getElementsByName("setTodaysFromDate")[0]
																				.setAttribute(
																						'min',
																						today);
																		document
																				.getElementsByName("setTodaysToDate")[0]
																				.setAttribute(
																						'min',
																						today);

																	});

													setInterval(
															function() {

																$scope.scheduleResult = "";
																$scope.$apply();
															}, 9000);
												},
												function(error) {
													$scope.status = 'Error retrieving customers! '
															+ error.message;
												})

							}

							// readSchedule();

							$scope.btn = 'Run Config';
							// run infinite loop
							$scope.runConfigInfinteLoop = function(
									runInfinteConfigurations) {

								runInfinteConfigurations["userID"] = $scope.currentLoggedUser;
								runInfinteConfigurations["from_date"] = runInfinteConfigurations.from_date;
								runInfinteConfigurations["to_date"] = runInfinteConfigurations.to_date;
								var fromdate = runInfinteConfigurations["from_date"];
								var todate = runInfinteConfigurations["to_date"];
								fromdate.setDate(fromdate.getDate() + 1);
								todate.setDate(todate.getDate() + 1);
								$scope.runInfinteConfig = runInfinteConfigurations;
								$scope.btn = 'In Progress';
								console.log($scope.runInfinteConfig);
								configurationFactory
										.runConfigInfinteLoop(
												$scope.runInfinteConfig)
										.then(
												function(response) {
													$scope.readSchedule();
													$scope.runResponse = [ response ];

													setInterval(
															function() {

																$scope.runResponse = "";
																$scope.$apply();
															}, 9000);
													$scope.btn = 'Schedule Config';

												},
												function(error) {
													$scope.status = 'Error retrieving customers! '
															+ error.message;
												})

							}

							$scope.btnLabel = [];

							// Run configuration
							$scope.runConfig = function(config, index) {
								var runObj = config;
								userObj["service_name"] = runObj.dataset_name

								$scope.btnLabel[index] = 'In Progress';
								configurationFactory
										.runConfiguration(userObj)
										.then(
												function(response) {
													$scope.run = [ response ];
													setInterval(function() {
														$scope.run = "";
														$scope.$apply();
													}, 9000);
													$scope.btnLabel[index] = 'Run now';
												},
												function(error) {
													$scope.status = 'Error retrieving customers! '
															+ error.message;
												})

							}

							$scope.label = 'SEND MESSAGE';
							// Get in touch function
							$scope.sendQuery = function() {
								$scope.label = 'Sending...';
								configurationFactory
										.contactus($scope.query)
										.then(
												function(response) {
													$scope.messageSent = response;
													$scope.label = 'SEND MESSAGE';
													var arr = Object
															.values($scope.messageSent);
													str1 = arr.join("");
													$scope.emailNotification = str1;
													setInterval(
															function() {
																$scope.emailNotification = "";
																$scope.$apply();
															}, 9000);

													$('form[name="queryForm"]')
															.submit();
													$('input[type="text"]')
															.val('');
													$("input[type='email']")
															.val('');
													$("input[type='url']").val(
															'');
													$('#messageText').val('');

												},
												function(error) {
													$scope.status = 'Error retrieving customers! '
															+ error.message;
												})
							}

							// Disable the configuration
							$scope.disableConfiguration = function(config) {
								var runObj = config;
								userObj["dataset_name"] = runObj.dataset_name

								/*
								 * $scope.config = { userID : 'SUNNY',
								 * dataset_name : 'e4e5cd1b-6f63-4da0-9d28' }
								 */
								configurationFactory
										.disableConfig(userObj)
										.then(
												function(response) {
													$scope.disable = [ response ];
													setInterval(function() {

														$scope.disable = "";
														$scope.$apply();
													}, 9000);
													console.log($scope.disable)
													displayConfiguration();
												},
												function(error) {
													$scope.status = 'Error retrieving customers! '
															+ error.message;
												})

							}

						} ]);
