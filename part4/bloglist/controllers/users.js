const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.post('/', async (request, response) => {
    const body = request.body
    // username , password and name.
    console.log(body)
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    const user =  new User({
        username: body.username,
        name: body.name,
        passwordHash
    })
    const savedUser = await user.save()

    response.json(savedUser)
})

module.exports = usersRouter