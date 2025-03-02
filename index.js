const https = require('https')
const express = require('express')
const cors = require('cors');
const fs = require('fs')

const httpsApp = express()
const httpApp = express()

// var expressWs = require('express-ws')(app);
httpApp.use(express.json());
httpApp.use(cors());

httpsApp.use(cors());
httpsApp.use(express.static(__dirname + '/public'));

const lights = require('./lights');

httpsApp.get('/', (req, res) => {
    res.sendFile(__dirname + '/site/index.html')
});

httpApp.post('/left', async (req, res) => {
    await lights.leftBlink();

    return res.json({ success: true });
});

httpApp.post('/right', async (req, res) => {
    await lights.rightBlink();

    return res.json({ success: true });
});

httpApp.post('/break', async (req, res) => {
    await lights.breakLight();

    return res.json({ success: true });
});

https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')    
}, httpsApp).listen(3000, () => {
    console.log(`Example app listening on port ${3000}`)
});

httpApp.listen(3001, () => {
    console.log(`Example app listening on port ${3001}`)
});