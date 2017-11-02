fs = require('fs')
var demoModel = 'not-yet-loaded'

module.exports = function(res){
	fs.readFile(__dirname + '/../demoModel.json', 'utf8', function (err,data) {
	  if (err) {
	    return console.log(err);
	  }
	  res.send(data)
	});
}