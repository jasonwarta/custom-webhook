'use strict';

let express = require('express');
let app = express();
app.use( express.json() );

app.post('/', (req,res) => {
	console.log(req.body);
});

app.listen(8888, () => console.log('listening on port 8888'));