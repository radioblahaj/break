const { SerialPort } = require('serialport');


async function init() {

    let picoPort;

    await SerialPort.list().then(ports => {
        ports.forEach(port => {
            if (!port || !port.path) {
                return;
            }

            console.log(port.path);
            if (port.path.startsWith('/dev/ttyACM0')) {
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