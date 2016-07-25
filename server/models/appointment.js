console.log('appointment model loaded...')

var mongoose = require('mongoose');

var AppointmentSchema = new mongoose.Schema({
	name: String,
	date: String,
	time: String,
	complaint: String,
	created_at: { type: Date, default: Date.now }
})

mongoose.model('Appointment', AppointmentSchema);