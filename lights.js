const { SerialPort } = require('serialport');

// SerialPort.list().then(ports => {
//     ports.forEach(port => {
//         console.log(port.path);
//     });
// }).catch(err => {
//     console.error('Error listing ports', err);
// });

// const pico = new SerialPort({
//     path: '/dev/tty.usbmodem1201',
//     baudRate: 9600,
// })

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

async function write(data) {
    // const send = pico.write(data, err => {
    //     if (err) {
    //         return console.log('Error on write: ', err.message);
    //     }
    //     console.log(data);
    // });
    console.log(data)
}

// Right Light
async function rightLight() {
    await write('R')
}

async function rightBlink() {
    for (let i = 0; i < 5; i++) {
        await rightLight()
        await sleep(1000)
        await offLight()
        await sleep(1000)
    }
}

// Left Light
async function leftLight() {
    await write('L')
}

async function leftBlink() {
    for (let i = 0; i < 5; i++) {
        await leftLight()
        await sleep(1000)
        await offLight()
        await sleep(1000)
    }
}

// Break Light
async function breakLight() {
    await write('F')
}

// Off Light
async function offLight() {
    await write('G')
}


module.exports = {
    rightLight,
    rightBlink,
    leftLight,
    leftBlink,
    breakLight,
    offLight
}