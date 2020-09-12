const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

loginRouter.post('/', async (request, response) => {
    const body = request.body
    const user = await User.findOne({ username: body.username })

    if (!user) {
        return response.status(401).json({ error: 'invalid user info' })
    }
    
    const passwordCorrect = await bcrypt.compare(body.password, user.passwordHash)
    if (user && passwordCorrect) {
        const token = jwt.sign({
            username: user.username,
            id: user._id
        }, process.env.SECRET)
        response.status(200)
            .json({
                token,
                username: user.username,
                name: user.name
            })
    } else {
        return response.status(401).json({ error: 'invalid username or password' })
    }
})

module.exports = loginRouter
