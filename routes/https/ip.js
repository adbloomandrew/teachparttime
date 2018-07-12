let express = require('express');

let router = express.Router();

//
//	This is an API endpoint that will send back the IP of the client making
//	the request.
//
router.get('/', function(req, res, next) {

	//
	//	1. 	Get the public IP of the client making the request.
	//
	//		IMPORTANT
	//
	//			We are grabbing it from the header since this app is hosted
	//			on Heroku, and our app is behind a Revers Proxy, so Heroku
	//			passes this information in the header.
	//
	let ips = req.headers["x-forwarded-for"];

	//
	//	2.	Set the response
	//
	res.json({
		ip: ips
	})

	//
	//	->	Close the connection with a positive message
	//
	res.end();

});

module.exports = router;