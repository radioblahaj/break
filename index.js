const express = require('express')
const app = express()
const port = 3000

const cors = require('cors');
app.use(cors());

app.use(express.json());

app.get('/right', (req, res) => {
  res.send('Hello World!')
})


app.post('/right', (req, res) => {
    console.log(req.body)
})

app.get('/left', (req, res) => {
    res.send('Hello World!')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})