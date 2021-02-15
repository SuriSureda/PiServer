const express = require('express');
const app = express();

let port = 8001;

app.get('/', (req, res) => {
    
    res.status(200).send(`<p>An alligator approaches!</p><p>Listenining on port ${port}</p>`);

});



app.listen(port, () => console.log('Raspberry pi server listening on port'+port));