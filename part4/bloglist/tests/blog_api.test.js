const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'This is test one blog',
    author: 'Stella Queresma',
    url: 'howdoesdinner@8sound.com',
    likes: 2
  },
  {
    title: 'I am a billionaire',
    author: 'Garvin Chimone',
    url: 'leaveyourmark@now.com',
    likes: 27
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObj = new Blog(initialBlogs[0])
  await blogObj.save()
  blogObj = new Blog(initialBlogs[1])
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

  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('unique identifier is id', async () => {
  try {
    const blogPost = new Blog({
      title: 'This is test one blog',
      author: 'Stella Queresma',
      url: 'howdoesdinner@8sound.com',
      likes: 2
    })
    const savedBlogPost = blogPost.save()

    const jsonBlog = (await savedBlogPost).toJSON

    if (jsonBlog.id && !jsonBlog._id) {
      console.log('Test passed: `id` exists and `_id` is removed.')
    } else {
      console.error('Test failed: Transformation did not work as expected.')
    }
  } catch(error) {
    console.error('Test failed with error:', error)
  }
})

test('a blog post is added', async () => {
  const newBlogPost = {
    title: 'This is test one blog',
    author: 'Stella Queresma',
    url: 'howdoesdinner@8sound.com',
    likes: 2
  }

  await api
    .post('/api/blogs')
    .send(newBlogPost)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r.author)

  assert.strictEqual(response.body.length, initialBlogs.length + 1)
  assert(contents.includes('Stella Queresma'))
})

// test('blog post without likes', async () => {
//   const newBlogPost = {
//     title: 'This is test one blog',
//     author: 'Stella Queresma',
//     url: 'howdoesdinner@8sound.com'
//   }

//   await api
//     .post('/api/blogs')
//     .send(newBlogPost)
//     .expect(400)

//   const response = await api.get('/api/blogs')
//   assert.strictEqual(response.body.length, initialBlogs.length)
// })

test('blogSchema sets default likes to 0', async () => {
  const blog = new Blog({ title: 'Title', author: 'Author', url: 'http://example.com' })
  await blog.validate()
  assert.strictEqual(blog.likes, 0)
})

after(async () => {
  await mongoose.connection.close()
})