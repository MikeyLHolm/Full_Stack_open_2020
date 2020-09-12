require('dotenv').config()
const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const { notEqual } = require('assert')
const Blog = require('./models/blog')

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs.map(blog => blog.toJSON()))
    })
})

app.post('/api/blogs', (request, response) => {
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

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})