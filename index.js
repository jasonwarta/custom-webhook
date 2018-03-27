'use strict';

let express = require('express');
let app = express();

app.get('*', (req,res) => {
	console.log(req,res);
});

app.listen(8888, () => console.log('listening on port 8888'));