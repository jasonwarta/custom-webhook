'use strict';

let express = require('express');
const { exec } = require('child_process');
let app = express();
app.use( express.json() );

app.post('/', (req,res) => {
	console.log('push event was triggered');
	exec("git log --pretty=format:'%H' -n 1", (err, stdout, stderr) => {
		if (err) {
			console.log("error");
			return;
		}

		if (req.body.after !== req.body.before) {
			console.log(`new commit to ${req.body.repository.name}`);
			exec(`./reloadProject.sh ${req.body.repository.name}`);
		}
		// console.log(stdout);
	});
	// console.log(req.body.before);
	// console.log(req.body.after);
});

app.listen(8888, () => console.log('listening on port 8888'));