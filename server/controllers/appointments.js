var mongoose = require('mongoose');
var Appointment = mongoose.model('Appointment');

module.exports = (function() {
	return {
		create: function(req, res) {
			var newAppt = new Appointment(req.body);
			console.log(newAppt)
			newAppt.save(function(err, info) {
				if(err)
					console.log("topic 10", err)
				else {
					Appointment.find({}, function(err, data) {
						if(err)
							console.log("topic 14", err);
						else
							var data = {data: data, info: info}
							res.json(data);
					})
				}
			})
		},

		read: function(req, res) {
			Appointment.find({}, function(err, data) {
				if(err)
					console.log("topic 25", err)
				else
					res.json(data)
			})
		}
	}
})();