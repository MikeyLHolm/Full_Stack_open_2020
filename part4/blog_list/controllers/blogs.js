const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
  //   Blog
//     .find({})
//     .then(blogs => {
//       response.json(blogs.map(blog => blog.toJSON()))
//     })
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })
  try {
    const savedBlog = await blog.save()
    response.json(savedBlog)
  } catch(exception) {
    next(exception)
  }
//   blog
//     .save()
//     .then(savedBlog => savedBlog.toJSON())
//     .then(savedAndFormatedBlog => {
//       response.json(savedAndFormatedBlog)
//     })
  // .then(result => {
  //   response.status(201).json(result)
  // })
})

module.exports = blogsRouter