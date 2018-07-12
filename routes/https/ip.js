let express = require('express');

let router = express.Router();

router.get('/', function(req, res, next) {

	//
	//	x.	Set the response
	//
	res.json({
		ip: "131231232"
	})

	//
	//	x.	Close the connection with a positive message
	//
	res.end();

});

module.exports = router;