var guide;
var guideVisible = true;

function init() {
	
	// Init the JS SDK
	FB.init({
		appId  : app_id,
		status : true, // check login status
		cookie : true, // enable cookies to allow the server to access the session
		xfbml  : true  // parse XFBML
	});
	
	// Set canvas height
	FB.Canvas.setAutoResize(100);
	
	// Test that data was correctly written in PHP wrapper
	debug.log("user_is_fan = " + user_is_fan);
	debug.log("app_id = " + app_id);
	debug.log(app_data);
	
	// user_id will be undefined until basic permissions is granted
	if (user_id != -1) debug.log("user_id = " + user_id);
	
//	requestEmailPermission('email,offline_access');	
//	requestEmailPermission('email');
	
	// Test some methods
	//loginAndRequestPermissions();
	//postToWall();
}

function requestEmailPermission(perms)
{
	debug.log("requestEmailPermission");
	FB.ui({method: "permissions.request", "perms": perms} , requestEmailPersmissionCallback);
}

function requestEmailPersmissionCallback(data)
{
	debug.log(data);
}

function postToWall() {
	FB.ui(
	  {
	    method: 'feed',
	    attachment: {
	      name: 'JSSDK',
	      caption: 'The Facebook JavaScript SDK',
	      description: (
	        'A small JavaScript library that allows you to harness ' +
	        'the power of Facebook, bringing the user\'s identity, ' +
	        'social graph and distribution power to your site.'
	      ),
	      href: 'http://fbrell.com/'
	    },
	    action_links: [
	      { text: 'fbrell', href: 'http://fbrell.com/' }
	    ]
	  },
	  function(response) {
	    if (response && response.post_id) {
	      debug.log('Post was published.');
	    } else {
	      debug.log('Post was not published.');
	    }
	  }
	);
}

$(document).ready(init);