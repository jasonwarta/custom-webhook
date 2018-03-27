'use strict';

let express = require('express');
const { exec, spawn } = require('child_process');
let app = express();
app.use( express.json() );

const PROJECTS_ROOT = `${process.env.HOME}/projects`

app.post('/', (req,res) => {
	const projectDir = `${PROJECTS_ROOT}/${req.body.repository.name}`;

	exec(`cd "${projectDir}" && git log --pretty=format:'%H' -n 1`, (err, stdout, stderr) => {
		if (err) {
			console.log(err);
			return;
		}

		if (req.body.after !== req.body.before) {
			exec(`cd "${projectDir}" && ./reload.sh`, (err,stdout,stderr) => {
				console.log(stdout);
			});
		}
	});
	res.end('yes');
});

app.listen(8888, () => console.log('listening on port 8888'));
