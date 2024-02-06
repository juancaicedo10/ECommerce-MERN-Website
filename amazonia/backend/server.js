const express = require('express');
const cors = require('cors');
const data = require('./data.js');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const seedRouter = require('./routes/seedRoutes.js');
const productRouter = require('./routes/productRoutes.js');
const userRouter = require('./routes/userRoutes.js');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("connected to db");
}).catch((err) => {
    console.log(err.message);
});

const app = express();

// Middleware para el análisis de JSON y datos de formulario
app.use((req, res, next) => {
    let data = '';
    req.on('data', chunk => {
      data += chunk;
    });
    req.on('end', () => {
      req.body = JSON.parse(data);
      next();
    });
  });

// Middleware de CORS
app.use(cors());

// Rutas
app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

// Ruta para obtener productos (para fines de demostración)
app.get('/api/products', (req, res) => {
    res.send(data.products);
});

const PORT = process.env.PORT || 5000;

app.get('/public', express.static('public'));

app.listen(PORT, () => {
    console.log("App is listening...");
});
