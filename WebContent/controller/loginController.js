/**
 * 
 * 
 * 
 * Name :-------Login Controller--------------------- Desc: Used to call all the
 * functions required to carry out the login such as user creation,forgor
 * password,login functionality . Author : Bandana Harlalka Creation Date :
 * 24-03-2018
 * 
 * 
 * 
 */

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
						"userFactory",
						function($state, $cookies, $scope, $window, $http,
								$location, loginFactory, userFactory) {

							// Disabling back button on the browser
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

							// Get Logged User from cookies
							$scope.currentUser = $cookies.getObject('data');
							// $scope.successMsg="";
							$("#secQuestion").hide();
							$("#secAnswer").hide();
							$("#updatePassword").hide();
							$('#check').hide();
							$('#submit').hide();
							$('#userid').show();
							$('#next').show();

							// List of security questions
							$scope.securityQuestions = [
									"What is you Favourite Sport",
									"Which is your birth place",
									"Which is your desired destination",
									"What is the name of your pet",
									"What is your nickname",
									"What is your maidens Name" ]

							$scope.checkCredentials = function() {
								$window.location.href = './index.html';
								$scope.indexMsg = "Please enter username and password";
								setInterval(function() {
									$scope.indexMsg = "";
									$scope.$apply();
								}, 9000);

							}

							$scope.label = 'SEND MESSAGE';
							// Get in touch function
							$scope.sendQuery = function() {
								$scope.label = 'Sending...';
								loginFactory
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

							// create users
							$scope.createUserDetails = function() {
								console.log($scope.user);
								userFactory
										.createUser($scope.user)
										.then(
												function(response) {
													$scope.users = response;
													var arr = Object
															.values($scope.users);
													str1 = arr.join("");
													$scope.successCreation = str1;

													if ($scope.successCreation == "userID already exists, please try again!") {
														$scope.errorUserMsg = "userID already exists, please try again!";
														setInterval(
																function() {
																	$scope.errorUserMsg = "";
																	$scope
																			.$apply();
																}, 9000);
														;
													} else {
														$('#id').hide();
														$('#password').hide();
														$('#validfrom').hide();
														$('#validto').hide();
														$('#securityquestion')
																.hide();
														$('#securityanwser')
																.hide();
														$('#save').hide();
													}

													/*
													 * setInterval(function() {
													 * $scope.users = "";
													 * $scope.$apply(); },
													 * 5000);
													 */
													/*
													 * $('#registerModal').modal(
													 * 'hide')
													 */
												},
												function(error) {
													$scope.status = 'Error retrieving customers! '
															+ error.message;
												})

							}

							// Login Credentials
							$scope.loginUser = function() {

								/*
								 * if ($scope.login == undefined) {
								 * $scope.indexMsg = "Please enter username and
								 * password"; setInterval(function() {
								 * $scope.indexMsg = ""; $scope.$apply(); },
								 * 5000); } else {
								 */
								loginFactory
										.signDetails($scope.login)
										.then(
												function(response) {
													$scope.loggedUser = response;
													var arr = Object
															.values($scope.loggedUser);
													str1 = arr.join("");
													$scope.result = str1;
													setInterval(function() {

														$scope.result = "";
														$scope.$apply();
													}, 9000);
												},
												function(error) {
													$scope.status = 'Error retrieving customers! '
															+ error.message;
												})
								// }
							}

							// Authenticating Security Question for given UserID
							$scope.securityQuestion = function() {
								loginFactory
										.secQuestion($scope.user)
										.then(
												function(response) {
													$scope.question = response;
													// Getting the value form
													// JSON and trimming the ""
													var arr = Object
															.values($scope.question);
													str1 = arr.join("");
													$scope.userQuestion = str1;
													console
															.log(JSON
																	.stringify($scope.userQuestion));
													if ($scope.userQuestion == 'userID is incorrect, please try again!') {
														$scope.userQuestion = "";
														$scope.errorMessage = 'userID is incorrect, please try again!';
														setInterval(
																function() {
																	$scope.errorMessage = "";
																	$scope
																			.$apply();
																}, 9000);
													} else {
														$("#secQuestion")
																.show();
														$("#next").hide();
														$("#check").show();
														$("#secAnswer").show();
													}
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
										.secAnswer($scope.user)
										.then(
												function(response) {

													$scope.secAnswerValidation = response;

													var arr = Object
															.values($scope.secAnswerValidation);
													str1 = arr.join("");
													$scope.ansResult = str1;
													console
															.log(JSON
																	.stringify($scope.ansResult));
													if ($scope.ansResult == 'Security answer is False, Please try again!') {
														// $scope.ansResult =
														// "";
														$scope.errorMessage = 'Security answer is False, Please try again!';
														setInterval(
																function() {
																	$scope.errorMessage = "";
																	$scope
																			.$apply();
																}, 9000);
													} else {
														$('#updatePassword')
																.show();
														$('#check').hide();
														$('#submit').show();
													}
												},
												function(error) {
													$scope.status = 'Error retrieving customers! '
															+ error.message;
												})

							}

							// Updating the forgot password
							$scope.userPasswordUpdate = function() {
								loginFactory
										.updatePassword($scope.user)
										.then(
												function(response) {
													$scope.changedPassword = response;
													var arr = Object
															.values($scope.changedPassword);
													str1 = arr.join("");
													$scope.successMsg = str1;
													/*
													 * setInterval(function() {
													 * $scope.successMsg = "";
													 * $scope.$apply(); },
													 * 4000);
													 */
													/*
													 * $(
													 * 'form[name="forgot-password-Form"]')
													 * .submit();
													 * $('input[type="text"]')
													 * .val('');
													 */
													document
															.getElementById(
																	"forgot-password-Form")
															.reset();
													$('#check').hide();
													$('#submit').hide();
													$('#updatePassword').hide();
													$('#secQuestion').hide();
													$('#secAnswer').hide();
													$('#next').hide();
													$('#userid').hide();

													/*
													 * $('#forgotPasswordModal')
													 * .modal('hide');
													 */
												},
												function(error) {
													$scope.status = 'Error retrieving customers! '
															+ error.message;
												})
							}

							$scope.Close = function() {
								location.reload();
							}

						} ])