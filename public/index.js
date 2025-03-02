const ip = '10.42.0.109:3000'
const turnThreshold = 30

function rightTurn() {
    fetch(`https://${ip}/right`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    });
    console.log("signaling right turn");
}

function leftTurn() {
    fetch(`https://${ip}/left`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    });
    console.log("signaling left turn");
}

function breakSignal() {
    fetch(`https://${ip}/break`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    });

    console.log("signaling break");
}

// accelerometer

function enableMotion() {
    // feature detect
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        DeviceMotionEvent.requestPermission()
    }
}

let movingAvgAcl = [...Array(100).keys()];

function readAcl(newAcl) {
    movingAvgAcl.shift();
    movingAvgAcl.push(newAcl);
    let sum = 0;
    for (let i = 0; i < movingAvgAcl.length; i++) {
        sum += movingAvgAcl[i];
    }
    return sum / movingAvgAcl.length;
}

function horn() {
    const audio = new Audio('horn.mp3');
    audio.play();
    console.log("honking horn");
}

window.onload = () => {
    const changeme = document.getElementById("changeme");
    const body = document.getElementById("body");

    let angle = 0;
    let initialAngle = null;

    let turnBounce = false;


    window.ondeviceorientation = (event) => {
        if (initialAngle == null) {
            initialAngle = angle;
        }
        angle = event.beta - initialAngle;

        if (angle < -turnThreshold) {
            leftTurn()
            changeme.innerHTML = `${z} <br> ${angle.toFixed(0)}deg LEFT`;

            // setTimeout(() => {
            //     turnBounce = false
            // }, 5000)
        } else if (angle > turnThreshold) {
            rightTurn()
            changeme.innerHTML = `${z} <br> ${angle.toFixed(0)}deg RIGHT`;

            // setTimeout(() => {
            //     turnBounce = false
            // }, 5000);
        }

        else {
            changeme.innerHTML = `${z} <br> ${angle.toFixed(0)}deg`;
        }
    };

    bounce = false;

    window.ondevicemotion = (event) => {
        // x = event.acceleration.x
        z = readAcl(event.acceleration.z)

        if (z < -0.15 && !bounce) {
            breakSignal();

            bounce = true;

            setTimeout(() => {
                bounce = false;
            }, 5000)
        }
    }
}

