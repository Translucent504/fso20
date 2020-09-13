const Blog = require('../models/blog')
const User = require('../models/user')
const { isUndefined } = require('lodash')
const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(401).json({error:'Cant find Blog with that id'})
  }
  const decodedUser = jwt.decode(request.token, process.env.SECRET)
  if (!blog._id.toString() === decodedUser.id){
    return response.status(401).json({error:'invalid auth / only creator can delete blog'})
  } else {
    await blog.deleteOne()
    response.status(204).end()
  }

})

blogsRouter.post('/', async (request, response) => {
  if (isUndefined(request.body.url) && isUndefined(request.body.title)) {
    response.status(400).end()
  } else if (!request.token){
    return response.status(401).end()
  }else {
    const decodedUser = jwt.decode(request.token, process.env.SECRET)
    const user = await User.findOne(
      {
        username: decodedUser.username,
        _id: decodedUser.id
      }
    )
    if (!user) {
      return response.status(401).json({ error: 'invalid authentication token' })
    }
    const blog = new Blog(
      {
        ...request.body,
        user: user._id
      }
    )
    
    const result = await blog.save()
    user.blogs.push(blog._id)
    await user.save()
    const populatedBlog = await result.populate('user', { username: 1, name: 1, id: 1 }).execPopulate()
    response.status(201).json(populatedBlog)
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = request.body
  const result = await Blog.findByIdAndUpdate(request.params.id, updatedBlog)
  response.status(201).json(result)
})

module.exports = blogsRouter