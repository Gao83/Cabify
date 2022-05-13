const router = require("express").Router()
const Restaurant = require("../models/Restaurant.model")


router.post('/restaurant', (req, res, next) => {

    const { name, address } = req.body

    Restaurant
        .findOne({ name })
        .then((foundRestaurant) => {

            if (foundRestaurant) {
                res.status(400).json({ message: "Restaurant already exists." })
                return
            }
            return Restaurant.create({ name, address })
        })
        .then(() => {
 
            res.status(201).json({ message: "created" })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Internal Server Error" })
        })

})


router.get('/restaurants', (req, res) => {

    Restaurant
        .find()
        .then((allRestaurants) => {

            const list = allRestaurants.map((elem) => {
                const { name, address } = elem
                const restaurantList = { name, address }
                return restaurantList
            })

            res.status(201).json(list)
        })
        .catch(err => {
            res.status(500).json({ message: "Internal Server Error" })
        })
})





module.exports = router