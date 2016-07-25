var app = angular.module("app", ['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'partials/main.html',
		controller: 'userController'
	})
	.when('/dashboard', {
		templateUrl: 'partials/dashboard.html',
		controller: 'appointmentController'
	})
	.when('/appointment', {
		templateUrl: 'partials/appointment.html',
		controller: 'appointmentController'
	})
	.when('/user/:id', {
		templateUrl: 'partials/user.html',
		controller: 'userController'
	})
	.otherwise({
		redirectTo: '/'
	})
})

app.factory('userFactory', function($http, $location) {
	var factory = {};
	var thisUser = null;

	factory.readUsers = function(user, callback) {
		var newUser = true;
		$http.get('/user').success(function(data) {
			angular.forEach(data, function(regUser) {
				if(user.name == regUser.name) {
					console.log(user.name, "matches", regUser.name);
					newUser = false;
					thisUser = regUser
					$location.path('/dashboard');
				}	
			})          	
// If user does not exist, create new user and redirect to dashboard
			if(newUser == true) {	
				console.log("User is new, Creating...");
				$http.post('/user', user).success(function(data) {
					console.log("New user has been created...")
					thisUser = data;
					$location.path('/dashboard');
				})
			}
		})
		callback(thisUser);	
	}

	factory.readUser = function(callback) {
		callback(thisUser);
	}


	factory.viewUser = function(id, callback) {
		$http.get('/user/'+id).success(function(data) {
			callback(data[0]);
		})
	}

	factory.updateUserAppts = function(data, name, callback) {
		var topics = [];
		angular.forEach(data, function(topic) {
			if(topic.user_id == name._id)
				topics.push(topic);
		})
		$http.post('/user/topics/'+name._id, {topics: topics}).success(function(data) {})
	}

	return factory;
})

app.controller('userController', function($scope, $routeParams, userFactory) {
	var id = $routeParams.id;
	
	$scope.checkUser = function(user) {
		userFactory.readUsers(user, function(data) {
		})
	}

	userFactory.viewUser(id, function(data) {
		$scope.user = data;
	})

})

app.controller('appointmentController', function($scope, appointmentFactory, userFactory) {
	$scope.newAppt = {};

	userFactory.readUser(function(data) {
		$scope.user = data;
	})

	console.log($scope.user)

	$scope.createAppt = function(newAppt, name) {
		newAppt.name = name.name;
		newAppt.user_id = name._id;
		appointmentFactory.createAppt(newAppt, function(data, info) {
			userFactory.updateUserAppts(data, name, function(info) {});
			$scope.appts = data.data;
			$scope.newAppt = {};
		})
	}

	appointmentFactory.readAppts(function(data) {
		$scope.appts = data;
	})	
})

app.factory('appointmentFactory', function($http, $location) {
	var factory = {};
	var currentUser = null;

	factory.createAppt = function(newTopic, callback) {
		$http.post('/appointments', newTopic).success(function(data) {
			callback(data);
			$location.path('/dashboard');
		})
	}

	factory.readAppts = function(callback) {
		$http.get('/appointments').success(function(data) {
			callback(data);
		})
	}

	return factory;
})
