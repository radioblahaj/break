function rightTurn() {
    fetch("http://localhost:3001/right", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    });
    console.log("signaling right turn");
}

function leftTurn() {
    fetch("http://localhost:3001/left", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    });
    console.log("signaling left turn");
}

function breakSignal() {
    fetch("http://localhost:3001/break", {
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

window.onload = () => {
    const changeme = document.getElementById("changeme");
    const body = document.getElementById("body");

    let angle = 0;

    window.ondeviceorientation = (event) => {
        if (event.angle) {
            angle = event.alpha;
        }
    };

    bounce = false;

    window.ondevicemotion = (event) => {
        // x = event.acceleration.x
        z = readAcl(event.acceleration.z)

        changeme.innerHTML = `${z} <br> ${angle.toFixed(0)}deg`;

        if (z < -0.15 && !bounce) {
            breakSignal();
            bounce = true;

            setTimeout(() => {
                bounce = false;
            }, 5000)
        }
    }
}

