function onRightClick() {
    console.log("hi")
    const sendRight = fetch("http://localhost:3000/right", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId: "hi",
            channel: "hi"
        })
    });
}

function enableMotion() {
    // feature detect
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        DeviceMotionEvent.requestPermission()
    }
}


window.onload = () => {

    const changeme = document.getElementById("changeme");
    const body = document.getElementById("body");

    let angle = 0;

    window.ondeviceorientation = (event) => {
        angle = event.alpha;
    };

    window.ondevicemotion = (event) => {
        a = event.acceleration.x
        b = event.acceleration.y
        math = b * (1/Math.cos(Math.atan(b/a)))

        if (math > 4) {
            changeme.innerHTML = `math: ${math.toFixed(0)}`;
            body.style.backgroundColor = "red";
        } else {
            body.style.backgroundColor = "white";
        }
    }
}

