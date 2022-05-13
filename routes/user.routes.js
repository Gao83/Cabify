const router = require("express").Router();
const User = require("../models/User.model")
const Restaurant = require("../models/Restaurant.model")

router.post('/eaters', (req, res, next) => {

    const { email, username } = req.body

    User
        .findOne({ email })
        .then((foundUser) => {

            if (foundUser) {
                res.status(400).json({ message: "User already exists." })
                return
            }
            return User.create({ email, username })
        })
        .then((createdUser) => {
            const { email, username } = createdUser
            const user = { email, username }

            res.status(201).json({ user })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Internal Server Error" })
        })

})


router.get('/eaters', (req, res) => {

    User
        .find()
        .then((allUsers) => {

            const list = allUsers.map((elem) => {
                const { username, email } = elem
                const usersList = { username, email }
                return usersList
            })

            res.status(201).json(list)
        })
        .catch(err => {
            res.status(500).json({ message: "Internal Server Error" })
        })
})


router.post('/eaters', (req, res, next) => {

    const promise = [

        User
            .deleteMany(),
        Restaurant
            .deleteMany(),
    ]

    Promise
        .All(promise)

        .then(() => {
            res.status(201).json({message: 'Eaters deleted'})
        })
        .catch(err => console.log(err))
})

module.exports = router
