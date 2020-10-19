const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)
  expect(titles).toContain(
    'Go To Statement Considered Harmful'
  )
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'async/await simplifies making async calls',
    author: 'Edward D. Icky',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 0,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(n => n.title)
  expect(titles).toContain(
    'async/await simplifies making async calls'
  )
})

test('blog without title is not added', async () => {
  const newBlog = {
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('return the correct amount of blog posts in the JSON format', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

// test('a specific blog can be viewed', async () => {
//   const blogsAtStart = await helper.blogsInDb()

//   const blogToView = blogsAtStart[0]

//   const resultblog = await api
//     .get(`/api/blogs/${blogToView.id}`)
//     .expect(200)
//     .expect('Content-Type', /application\/json/)

//   const processedblogToView = JSON.parse(JSON.stringify(blogToView))

//   expect(resultblog.body).toEqual(processedblogToView)
// })

// test('a blog can be deleted', async () => {
//   const blogsAtStart = await helper.blogsInDb()
//   const blogToDelete = blogsAtStart[0]

//   await api
//     .delete(`/api/blogs/${blogToDelete.id}`)
//     .expect(204)

//   const blogsAtEnd = await helper.blogsInDb()

//   expect(blogsAtEnd).toHaveLength(
//     helper.initialblogs.length - 1
//   )

//   const contents = blogsAtEnd.map(r => r.content)

//   expect(contents).not.toContain(blogToDelete.content)
// })

afterAll(() => {
  mongoose.connection.close()
})
