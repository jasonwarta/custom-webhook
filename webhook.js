'use strict';

let express = require('express');
const { exec, spawn } = require('child_process');
let app = express();
app.use( express.json() );

const PROJECTS_ROOT = `~/projects/`

app.post('/', (req,res) => {
	exec("git log --pretty=format:'%H' -n 1", (err, stdout, stderr) => {
		if (err) {
			console.log("error");
			return;
		}
		
		console.log(`current ${stdout}`)
		console.log(`head ${req.body.head_commit.id}`);
		console.log(`after ${req.body.after}`);
		if (req.body.after !== req.body.before) {
			exec(`cd ${PROJECTS_ROOT}/${req.body.repository.name} && ./reloadProject.sh`, (err,stdout,stderr) => {
				console.log(stdout);
			});
		}
	});
	res.end('yes');
});

app.listen(8888, () => console.log('listening on port 8888'));
