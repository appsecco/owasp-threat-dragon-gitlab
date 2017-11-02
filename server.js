#!/usr/bin/env node
var debug = require('debug')('OWASP Threat Dragon');
var app = require('./td/app');

app.set('port', process.env.PORT || 3000);

if (!process.env.CLIENT_ID){
	console.error("Gitlab CLIENT_ID not set. Check README. Exiting!")
}else if(!process.env.CLIENT_SECRET){
	console.error("Gitlab CLIENT_SECRET not set. Check README. Exiting!")
}else if(!process.env.CALLBACK_URL){
	console.error("Gitlab CALLBACK_URL not set. Check README. Exiting!")
}else if(!process.env.GITLAB_URL){
	console.error("Gitlab GITLAB_URL not set. Check README. Exiting!")
}else if(!process.env.ENCRYPTION_KEY){
	console.error("Gitlab ENCRYPTION_KEY not set. Check README. Exiting!")
}else if(!process.env.SESSION_SECRET){
	console.error("Gitlab SESSION_SECRET not set. Check README. Exiting!")
}else{
	var server = app.listen(app.get('port'), function() {
	    debug('Express server listening on port ' + server.address().port);
	});
}