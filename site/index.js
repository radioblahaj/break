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