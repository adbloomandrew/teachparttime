let express = require('express');

let router = express.Router();

router.get('/', function(req, res, next) {

	//
	//	->	Render the HTML page
	//
	res.render("_frame", {
		title: "Teach Part Time",
		description: "Qkids is an online teaching community where thousands of people from the USA and Canada are earning between $16 - $20.00 per hour to teach kids English online.",
		url: "https://" + req.hostname,
		partials: {
			body: 'video'
		}
	});

});

module.exports = router;