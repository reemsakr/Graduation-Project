const express = require('express')
const router = express.Router()
const carModel = require('../Models/Cars')
//const verifyToken = require('./verfyjwt')
//const Joi = require('@hapi/joi')
//const bcrypt = require('bcrypt')

router.get('/all', async (req, res) => {
    const cars = await carModel.find()
    try {
        res.send(cars)
    }
    catch (err) {
        res.send(err)
    }

})

router.post('/add', async (req, res) => {

    const car = new carModel({
        email: req.body.email,
        location: req.body.location
    })

    const check = await carModel.findOne({ email: car.email })
    try {
        if (!check) {
            const save = await car.save()
            try {
                res.status(201).send(save)
            }
            catch (err) {
                res.send(err)
            }
        }
        else{
            try {
                
                res.status(400).send({
                    msg:'this email is signed before',
                    car:check

                })
            }
            catch (err) {
                res.send(err)
            }
            
        }
    }
    catch (err) {
        res.send(err)
    }

})




router.delete('/:email', async (req, res) => {
    const email = req.params.email
    const car = await carModel.remove({ email: email })

    try {
        res.send(car)
    }
    catch (err) {
        res.send(err)
    }
})

router.patch('/:email', async (req, res) => {
    const email = req.params.email

    const updatedCar = await carModel.updateOne(
        { email: email },
        {
            $set: req.body
        }
    )
    try {
        res.send(updatedCar)
    }
    catch (err) {
        res.send(err)
    }

})


module.exports = router