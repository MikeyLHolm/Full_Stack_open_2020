const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs.map(blog => blog.toJSON()))
    })
})

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(savedBlog => savedBlog.toJSON())
    .then(savedAndFormatedBlog => {
      response.json(savedAndFormatedBlog)
    })
    // .then(result => {
    //   response.status(201).json(result)
    // })
})

module.exports = blogsRouter