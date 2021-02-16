const express = require('express');
const app = express();

let port = 8001;

app.get('/', (req, res) => {
    
    res.status(200).send("Que pasa troncooo");

});



app.listen(port, () => console.log('Raspberry pi server listening on port'+port));