const Blog = require('../models/blog')
const { isUndefined } = require('lodash')
const blogsRouter = require('express').Router()

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  if (isUndefined(request.body.url) && isUndefined(request.body.title)) {
    response.status(400).end()
  } else {
    const blog = new Blog(request.body)
    const result = await blog.save()
    response.status(201).json(result)
  }
})

module.exports = blogsRouter