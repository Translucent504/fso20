const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', {url: 1, title: 1, author: 1, id: 1})
    response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response) => {
    const body = request.body
    // username , password and name.
    console.log(body)
    const saltRounds = 10
    // Validate Password
    if (!body.password || body.password.length < 3) {
        return response
            .status(400)
            .json({
                error: 'password too short (<3 characters) or not present.'
            })
    }


    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash
    })
    const savedUser = await user.save()
    response.json(savedUser)
})

module.exports = usersRouter