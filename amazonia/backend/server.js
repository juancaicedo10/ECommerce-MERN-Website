const express = require('express');
const cors = require('cors');
const data = require('./data.js')
const app = express()

app.use(cors())


app.get('/api/products', (req, res) => {
    res.send(data.products)
})

const PORT = process.env.PORT || 5000;

app.get('/public', express.static('public'));

app.listen(PORT, () => {
    console.log("App is listening...")
})