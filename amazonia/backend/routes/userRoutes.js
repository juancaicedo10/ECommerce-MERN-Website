const express = require('express')
const User = require('../models/userModel');
const bcrypt = require('bcryptjs')
const { generateToken } = require('../utils.js')
const expressAsyncHandler = require('express-async-handler')
const { isAuth } = require('../utils.js')
const userRouter = express.Router();



userRouter.post('/signin', expressAsyncHandler(async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password

        // Buscar usuario por su correo electrónico en la base de datos
        const user = await User.findOne({ email });

        console.log(user)// Verificar si el usuario existe y si la contraseña es correcta
        if (user) {
            if (bcrypt.compareSync(password, user.password)) {
                res.send({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user)
                });
                return;
            } else {
                res.status(404).send({ message: 'Invalid password' })
            }
        } else {
            // Si el usuario no existe o la contraseña es incorrecta, responder con un mensaje de error
            res.status(401).send({ message: 'Invalid email or password' });
        }
    } catch (err) {
        // Capturar cualquier error y responder con un mensaje de error genérico
        console.log(err); // Muestra el error en la consola para fines de depuración
        res.status(500).send({ message: 'A error occurred while processing your request' });
    }
}));

userRouter.post('/signup', expressAsyncHandler(async (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
    });

    console.log(newUser)

    try {
        const user = await newUser.save();
        res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user)
        });
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: 'Error al registrar usuario' });
    }
    }))


userRouter.put('/profile', isAuth, expressAsyncHandler(async (req, res) => {

    try {
        
    const user = await User.findById(req.user._id)

    if(user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = bcrypt.hashSync(req.body.password, 8)
        }

        const updatedUser = await user.save()

        res.send({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser)
        })
    } else {
        res.status(404).send({ message: 'Use not found' })
    }
} catch (error) {
        console.log(error)
        res.status(500).send({ message: error })
}
}))



module.exports = userRouter;
