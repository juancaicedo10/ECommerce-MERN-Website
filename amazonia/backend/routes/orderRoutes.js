const express = require('express')
const Order = require('../models/orderModel.js')
const expressAsyncHandler = require('express-async-handler')
const isAuth = require('../utils.js')

const orderRouter = express.Router();


orderRouter.post('/', expressAsyncHandler( async (req, res) => {
    try {
    const newOrder = new Order({
        orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id})),
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user?._id

    });

    const order = await newOrder.save();
    res.status(201).send({ message: 'New Order Created' , order })
}catch (err) {
    console.log(err)
}
}));

orderRouter.get('/:id', expressAsyncHandler( async (req, res) => {
    try {
    const order = await Order.findById(req.params.id);
    console.log(order)
    if (order) {
        res.send(order)
    }else { 
        res.status(404).send({ message: 'order not found' })
    }
    }catch (err) {
        console.log(err)
        res.status(500).send({ message: err })
    }
}));

module.exports = orderRouter