'use strict';

let express = require('express');
const { exec } = require('child_process');
let app = express();
app.use( express.json() );

const PROJECTS_ROOT = `~/projects/`

app.post('/', (req,res) => {
	console.log('push event was triggered');
	exec("git log --pretty=format:'%H' -n 1", (err, stdout, stderr) => {
		if (err) {
			console.log("error");
			return;
		}
		
		console.log(`current ${stdout}`)
		console.log(`head ${req.body.head_commit.id}`);
		console.log(`after ${req.body.after}`);
		if (req.body.after !== req.body.before) {
			console.log(`new commit to ${req.body.repository.name}`);
			exec(`ls ${PROJECTS_ROOT}`, (err,stdout,stderr) => {
				console.log(err,stdout,stderr);
			});
		}
	});
});

app.listen(8888, () => console.log('listening on port 8888'));
