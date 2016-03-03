Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});
Parse.Cloud.define('sendPush', function(request, response) {
	
	Parse.initialize(process.env.APP_ID, '', process.env.MASTER_KEY);
	Parse.serverURL = "https://mysnap.herokuapp.com/parse";
	
	// request has 2 parameters: params passed by the client and the authorized user
	var userTo = request.params.userTo;
	
	// extract out the channel to send
	var message = request.params.message;
	
	// use to custom tweak whatever payload you wish to send
	var query = new Parse.Query(Parse.User);
      	query.equalTo("objectId", userTo);

	 // Get the first user which matches the above constraints.
      	query.first({
		success: function(quser) {
			var pushQuery = new Parse.Query(Parse.Installation);
			pushQuery.equalTo("deviceType", quser);
	
			// Note that useMasterKey is necessary for Push notifications to succeed.
			Parse.Push.send({
				where: pushQuery,      // for sending to a specific channel
				data: {
					"alert": message, 
					"content-available": 1
			  	}
			}, { 
				success: function() {
				console.log("#### PUSH OK");
				response.success("PUSH SENT");
			}, 	error: function(error) {
				console.log("#### PUSH ERROR" + error.message);
				response.error("error => " + error.message);
			}, useMasterKey: true});
		},
		error: function(err) {
			response.error(err);
		}
	});
	

	
});
