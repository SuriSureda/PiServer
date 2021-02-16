const express = require('express');
const app = express();
const Gpio = require('pigpio').Gpio;
const led = new Gpio(17, {mode: Gpio.OUTPUT});

let port = 8001;

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


app.listen(port, () => console.log('Raspberry pi server listening on port'+port));