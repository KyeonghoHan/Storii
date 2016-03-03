
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});
Parse.Cloud.define('sendPush', function(request, response) {
	
	// request has 2 parameters: params passed by the client and the authorized user
	var userTo = request.userTo;
	
	// extract out the channel to send
	var message = request.message;
	
	// use to custom tweak whatever payload you wish to send
	var userQuery = new Parse.Query(Parse.User);
	userQuery.equalTo("objectId", userTo);
	userQuery.first({
		success: function(user) {
			var payload = 	{
				"data": 
				{
					"alert": message,
			  	}
			};
			
			var pushQuery = new Parse.Query(Parse.Installation);
			pushQuery.equalTo("user", user);
	
			// Note that useMasterKey is necessary for Push notifications to succeed.
			Parse.Push.send({
				where: pushQuery,      // for sending to a specific channel
				data: payload,
			}, { 
				success: function() {
				console.log("#### PUSH OK");
			}, 	error: function(error) {
				console.log("#### PUSH ERROR" + error.message);
			}, useMasterKey: true});
			
			response.success('success');
		}
	});
	

	
});
