const { SerialPort } = require('serialport');


async function init() {

    let picoPort;
    let stopLeft = false;
    let stopRight = false;
    let leftInProg = false;
    let rightInProg = false;

    await SerialPort.list().then(ports => {
        ports.forEach(port => {
            if (!port || !port.path) {
                return;
            }

            console.log(port.path);
            if (port.path.startsWith('/dev/tty.usbmodem')) {
                picoPort = port.path;
            }
        });
    }).catch(err => {
        console.error('Error listing ports', err);
    });

    if (!picoPort) {
        console.error('Pico port not found');
        process.exit(1);
    }

    const pico = new SerialPort({
        path: picoPort,
        baudRate: 9600,
    })

    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms))
    }

    async function write(data) {
        const send = pico.write(data, err => {
            if (err) {
                return console.log('Error on write: ', err.message);
            }
            console.log(data);
        });
        console.log(data)
    }

    // Right Light
    async function rightLight() {
        await write('R')
    }

    async function rightBlink() {
        if (rightInProg) return;
        console.log('------------------- right -------------------')

        rightInProg = true
        stopLeft = true
        for (let i = 0; i < 5 && !stopRight; i++) {
            await rightLight()
            await sleep(500)
            await offLight()
            await sleep(500)
        }
        stopRight = false
        rightInProg = false
    }

    // Left Light
    async function leftLight() {
        await write('L')
    }

    async function leftBlink() {
        if (leftInProg) return
        console.log('------------------- left -------------------') 

        leftInProg = true
        stopRight = true
        for (let i = 0; i < 5 && !stopLeft; i++) {
            await leftLight()
            await sleep(500)
            await offLight()
            await sleep(500)
        }
        stopLeft = false
        leftInProg = false
    }

    // Break Light
    async function breakLight() {
        console.log('------------------- brake -------------------')

        await write('B')
        await sleep(2000)
        await write('F')
    }

    // Off Light
    async function offLight() {
        await write('G')
    }

    return {
        rightLight,
        rightBlink,
        leftLight,
        leftBlink,
        breakLight,
        offLight
    }
}

module.exports = init;