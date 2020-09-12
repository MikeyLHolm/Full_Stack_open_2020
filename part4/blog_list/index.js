const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const { notEqual } = require('assert')

//const password = process.argv[2]

const mongoUrl =
  'mongodb+srv://lvlsevenwizard:secret777@bloglist.kjyjh.mongodb.net/bloglist?retryWrites=true&w=majority'

console.log('connecting to', mongoUrl)

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Blog = mongoose.model('Blog', blogSchema)

/* const blog = new Blog ({
  title: "30 Algorithms",
  author: "Iulia",
  url: "https://dev.to/iuliagroza/complete-introduction-to-the-30-most-essential-data-structures-algorithms-43kd",
  likes: 1
})

blog.save().then(result => {
  console.log('blog saved')
  mongoose.connection.close()
}) */

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

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})