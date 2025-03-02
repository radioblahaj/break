const https = require('https')
const express = require('express')
const { SerialPort } = require('serialport');
const cors = require('cors');
const fs = require('fs')

const app = express()
const port = 3000

var expressWs = require('express-ws')(app);
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/public'));

// SerialPort.list().then(ports => {
//     ports.forEach(port => {
//         console.log(port.path);
//     });
// }).catch(err => {
//     console.error('Error listing ports', err);
// });

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

async function rightBlink() {
    for (let i = 0; i < 5; i++) {
        const sendB = pico.write('B', err => {
            if (err) {
                return console.log('Error on write: ', err.message);
            }
            console.log('B');
        })
        await sleep(1000)
        console.log(sendB)
        const sendF = pico.write('F', err => {
            if (err) {
                return console.log('Error on write: ', err.message);
            }
            console.log('F');
        });
        console.log(sendF)
        await sleep(1000)
    }
}

const pico = new SerialPort({
    path: '/dev/tty.usbmodem1201',
    baudRate: 9600,
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/site/index.html')
});

app.post('/right', async (req, res) => {
    await rightBlink();

})

https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')    
}, app).listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})