const express = require('express')
const app = express()
const port = 3000
const { SerialPort } = require('serialport');
const cors = require('cors');
app.use(cors());
var expressWs = require('express-ws')(app);


app.use(express.json());

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
    path: '/dev/tty.usbmodem1301',
    baudRate: 9600,
})

app.get('/right', (req, res) => {
    res.send('Hello World!')
})

app.post('/right', async (req, res) => {
    await rightBlink();

})


app.get('/left', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})