console.log("modular routes loaded...")
var users = require('../controllers/users.js');
var appointments = require('../controllers/appointments.js');

module.exports = function(app){
	app.get('/user', users.read);
	app.post('/user', users.create);
	app.get('/appointments', appointments.read);
	app.post('/appointments', appointments.create);
}