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

SerialPort.list().then(ports => {
    ports.forEach(port => {
        console.log(port.path);
    });
}).catch(err => {
    console.error('Error listing ports', err);
});

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

async function lightBlink(direction) {
    let letter;

    switch (direction) {
        case "left":
            letter = "L"
            break;
        case "right":
            letter = "R"
            break;
    }

    for (let i = 0; i < 5; i++) {
        const sendB = pico.write(letter, err => {
            if (err) {
                return console.log('Error on write: ', err.message);
            }
            console.log(letter);
        })
        await sleep(1000)
        console.log(sendB)
        const sendG = pico.write('G', err => {
            if (err) {
                return console.log('Error on write: ', err.message);
            }
            console.log('F');
        });
        console.log(sendG)
        await sleep(1000)
    }
}

const pico = new SerialPort({
    path: '/dev/tty.usbmodem11301',
    baudRate: 9600,
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/site/index.html')
});

app.post('/right', async (req, res) => {
    await lightBlink("right");

})

app.post('/left', async (req, res) => {
    await lightBlink("left");

})

app.post('/openAll', async (req, res) => {
    const sendB = pico.write('B', err => {
        if (err) {
            return console.log('Error on write: ', err.message);
        }
        console.log('B');
    });
    console.log(sendB)
    await sleep(1000)
})


app.post('/closeAll', async (req, res) => {
    const sendF = pico.write('F', err => {
        if (err) {
            return console.log('Error on write: ', err.message);
        }
        console.log('F');
    });
    console.log(sendF)
    await sleep(1000)
})


https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')    
}, app).listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})