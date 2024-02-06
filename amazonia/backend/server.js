const express = require('express');
const cors = require('cors');
const data = require('./data.js')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const seedRouter = require('./routes/seedRoutes.js');
const productRouter = require('./routes/productRoutes.js')

dotenv.config()

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("contected to db")
}).catch((err) => {
    console.log(err.message)
})

const app = express();

app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter)
app.use(cors())


app.get('/api/products', (req, res) => {
    res.send(data.products)
})


const PORT = process.env.PORT || 5000;

app.get('/public', express.static('public'));

app.listen(PORT, () => {
    console.log("App is listening...")
})