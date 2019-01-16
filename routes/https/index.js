let express = require('express');

let router = express.Router();

router.get('/', function(req, res, next) {

	//
	//	1.	Get the subdomain from the URL
	//
	let css_file = req.hostname.split('.')[0];

	//
	//	2.	Create the custom path to the CSS
	//
	css = css_file + '.css';

	//
	//	->	Render the HTML page
	//
	res.render("_featured-frame", {
		title: "Qkids - Apply to Teach Kids English Online",
		description: "Qkids is an online teaching community where thousands of people from the USA and Canada are earning between $16 - $20.00 per hour to teach kids English online.",
		url: "https://" + req.hostname,
		css: css,
		page: "home",
		partials: {
			body: 'index'
		},
	});

});

module.exports = router;