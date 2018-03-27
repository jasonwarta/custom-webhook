'use strict';

let express = require('express');
let app = express();
app.use( express.json() );

app.post('/', (req,res) => {
	console.log('push event was triggered');
	exec("git log --pretty=format:'%H' -n 1", (err, stdout, stderr) => {
		if (err) {
			console.log("error");
			return;
		}
		console.log(stdout);
	});
	console.log(req.body.after);
});

app.listen(8888, () => console.log('listening on port 8888'));