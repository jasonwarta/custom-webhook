'use strict';

let express = require('express');
let app = express();

app.get('*', (req,res) => {
	console.log('GET')
	console.log(req,res);
});

app.post('*', (req,res) => {
	console.log('POST')
	console.log(req,res);
});

app.listen(8888, () => console.log('listening on port 8888'));