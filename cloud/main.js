Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});
Parse.Cloud.define('sendPush', function(request, response) {
	
	Parse.initialize('bf3d62c986203ffcef9a3bd96cc57a2c');
	Parse.serverURL = 'https://mysnap.herokuapp.com/parse';
	
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
			
			response.success('success');
		},
		error: function(err) {
			response.error(err);
		}
	});
	

	
});
