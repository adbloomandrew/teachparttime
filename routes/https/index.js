let express = require('express');

let router = express.Router();

router.get('/', function(req, res, next) {

	//
	//	1.	Get the subdomain from the URL
	//
	let css_file = req.hostname.split('.')[0];

	//
	//	2.	By default we load the default CSS if no subdomain is found.
	//
	let css = '/css/default.css';

	//
	//	3.	Check if the domain has a subdomain
	//
	if(css_file)
	{
		//
		//	1.	Create the custom path to the CSS
		//
		css = '/css/' + css_file + '.css';
	}

	console.log(req.hostname);
	console.log(css_file);
	console.log(css);

	//
	//	->	Render the HTML page
	//
	res.render("_frame", {
		title: "Teach Part Time",
		description: "Qkids is an online teaching community where thousands of people from the USA and Canada are earning between $16 - $20.00 per hour to teach kids English online.",
		url: "https://" + req.hostname,
		css: css,
		partials: {
			body: 'index'
		}
	});

});

module.exports = router;