const express = require('express');
const cors = require('cors');
const data = require('./data.js');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const seedRouter = require('./routes/seedRoutes.js');
const productRouter = require('./routes/productRoutes.js');
const userRouter = require('./routes/userRoutes.js');
const orderRouter = require('./routes/orderRoutes.js');

dotenv.config();

MONGODB_URI = 'mongodb://localhost:27017'

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("connected to db");
}).catch((err) => {
    console.log(err.message);
});

const app = express();

// Middleware para el análisis de JSON y datos de formulario

app.use((req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT') {
      let data = '';
      
      req.on('data', chunk => {
          data += chunk;
      });

      req.on('end', () => {
          try {
              // Parsear los datos del cuerpo de la solicitud manualmente
              req.body = JSON.parse(data);
              next();
          } catch (error) {
              console.error("Error parsing request body:", error);
              res.status(400).send("Error en el formato de los datos de la solicitud.");
          }
      });
  } else {
      next();
  }
});

// Middleware de CORS
app.use(cors());

app.get('/api/keys/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})

// Rutas
app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter)

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
