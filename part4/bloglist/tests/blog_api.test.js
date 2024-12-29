require('express-async-errors')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('when some notes are saved', () => {

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
})

describe('viewing one of the blogs', () => {
  test('unique identifier is id', async () => {
    const blogPost = new Blog({
      title: 'This is test one blog',
      author: 'Queresma',
      url: 'howdoesportugal@8sound.com',
      likes: 2
    })
    const savedBlogPost = await blogPost.save()

    const jsonBlog = savedBlogPost.toJSON()

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
})

describe('fails when one of the fields are missing', () => {
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
})

describe('modifying a specific blog post', () => {
  test('deleting a single blog post', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`./api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
    const contents = blogsAtEnd.map(r => r.title)
    assert(!contents.includes(blogToDelete.title))
  })
})

after(async () => {
  await mongoose.connection.close()
})