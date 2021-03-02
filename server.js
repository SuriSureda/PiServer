const express = require('express');
const hhtp = require('http');
const https = require('https');
const app = express();
const Gpio = require('pigpio').Gpio;
const led = new Gpio(17, {mode: Gpio.OUTPUT});
const fs = require('fs');
const wakeHeroku = require("./wakeHeroku");
const dotenv = require('dotenv');
dotenv.config();

//certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/raspberrymurta.ddns.net/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/raspberrymurta.ddns.net/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/raspberrymurta.ddns.net/chain.pem', 'utf8')

let httpport = 8001;
let httpsport = 8002;

const credentials = {
                key: privateKey,
                cert: certificate,
                ca: ca
};

const httpServer = express();

// set up a route to redirect http to https
httpServer.get('*', function(req, res) {
        res.redirect('https://' + req.headers.host + req.url);
        // Or, if you don't want to automatically detect the domain name from the request header, you can hard code it:
        // res.redirect('https://example.com' + req.url);
})

app.get('/', (req, res) => {
    res.status(200).send(`Wellcome !! Current led states is : ${led.digitalRead()}`);
});

app.get('/on', (req, res) => {
    led.digitalWrite(1);
    res.status(200).send(`Led now is ${led.digitalRead()}`);
});

app.get('/off',(req, res) => {
    led.digitalWrite(0);
    res.status(200).send(`Led now is ${led.digitalRead()}`);
})


const httpsServer = https.createServer(credentials, app);

httpServer.listen(httpport);

httpsServer.listen(httpsport, () => {
    console.log('Raspberry pi server listening on port '+httpsport)
    wakeHeroku(process.env.HERO_URL,25);
});