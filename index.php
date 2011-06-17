<? require 'fbsdk/facebook.php';

$app_id = "117494231646679";
$app_secret = "7b96d2529cfc106f54aa4a3e47b6e96b";

$facebook = new Facebook(array(
	'appId' => $app_id,
	'secret' => $app_secret,
	'cookie' => true
));

// Receive, decrpt, and decode signed request
$encoded_sig = null;
$payload = null;
list($encoded_sig, $payload) = explode('.', $_REQUEST['signed_request'], 2);
$sig = base64_decode(strtr($encoded_sig, '-_', '+/'));
$app_data = base64_decode(strtr($payload, '-_', '+/'), true);

// Here is all the available data as a JSON string
$decoded_data = json_decode($app_data);

// For convenice, we'll define some variables directly
$user_is_fan = $decoded_data->page->liked;
$page_id = $decoded_data->page->id;
$user_id = $decoded_data->user_id;

// Now we write all of our data to global JS vars
echo "<script type='text/javascript'>" .
	"var app_data = " . $app_data . ";"  .
	"var app_id = " . $app_id . ";" .
	"var user_is_fan = " . ($user_is_fan ? "true" : "false") . ";" .
"</script>";

// Now load the HTML of the app
echo (file_get_contents("app.html"));