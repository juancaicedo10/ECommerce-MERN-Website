const express = require('express');
const cors = require('cors');
const data = require('./data.js')
const app = express()

app.use(cors())


app.get('/api/products', (req, res) => {
    res.send(data.products)
})

app.get('/api/products/slug/:slug', (req, res) => {
    const product = data.products.find(x => x.slug === req.params.slug);
    if(product) {
        res.send(product)
    } else {
        res.status(404).send({ message: "product not found" })
    }
    res.send(data.products)
})

app.get('/api/products/:id', (req, res) => {
    const product = data.products.find(x => x._id === req.params.id);
    if(product) {
        res.send(product)
    } else {
        res.status(404).send({ message: "product not found" })
    }
    res.send(data.products)
})

const PORT = process.env.PORT || 5000;

app.get('/public', express.static('public'));

app.listen(PORT, () => {
    console.log("App is listening...")
})