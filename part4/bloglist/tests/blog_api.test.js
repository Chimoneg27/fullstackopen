require('express-async-errors')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObj = new Blog(helper.initialBlogs[0])
  await blogObj.save()
  blogObj = new Blog(helper.initialBlogs[1])
  await blogObj.save()
})

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('unique identifier is id', async () => {
  const blogPost = new Blog({
    title: 'This is test one blog',
    author: 'Queresma',
    url: 'howdoesportugal@8sound.com',
    likes: 2
  })
  const savedBlogPost = blogPost.save()

  const jsonBlog = (await savedBlogPost).toJSON

  if (jsonBlog.id && !jsonBlog._id) {
    console.log('Test passed: `id` exists and `_id` is removed.')
  } else {
    console.error('Test failed: Transformation did not work as expected.')
  }
})

test('a blog post is added', async () => {
  const newBlogPost = {
    title: 'This is test one blog',
    author: 'Queresma',
    url: 'howdoestrivela@8sound.com',
    likes: 2
  }

  await api
    .post('/api/blogs')
    .send(newBlogPost)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  const contents = blogsAtEnd.map(b => b.author)
  assert(contents.includes('Queresma'))
})

test('blog post without title', async () => {
  const newBlogPost = {
    author: 'Queresma',
    url: 'https://',
    likes: 2
  }

  await api
    .post('/api/blogs')
    .send(newBlogPost)
    .expect(400)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('blog post without author', async () => {
  const newBlogPost = {
    title: 'Max Steele',
    url: 'https://',
    likes: 2
  }

  await api
    .post('/api/blogs')
    .send(newBlogPost)
    .expect(400)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('blogSchema sets default likes to 0', async () => {
  const blog = new Blog({ title: 'Title', author: 'Author', url: 'http://example.com' })
  await blog.validate()
  assert.strictEqual(blog.likes, 0)
})

after(async () => {
  await mongoose.connection.close()
})