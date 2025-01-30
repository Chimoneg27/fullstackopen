const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { tokenExtractor } = require('../utils/middleware')
const authToken = require('../utils/authToken')
blogsRouter.use(tokenExtractor)

blogsRouter.get('/',  async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if(blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  const user = request.user
  if (!user) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const blog = new Blog({
    ...request.body,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const user = request.user

  if(!user) {
    return response.status(401).json({ message: 'token missing or invalid' })
  }

  if(!blog) {
    return response.status(404).json({ message: 'Blog not found' })
  }

  if(blog.user.toString() !== request.user.id) {
    return response.status(403).json({ message: 'You can only delete the blog you created' })
  }

  await blog.deleteOne()
  response.status(200).json({ message: 'Blog deleted' })
})

blogsRouter.put('/:id', tokenExtractor, authToken ,async (request, response) => {
  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'User not authenticated' })
  }

  const blog = await Blog.findById(request.params.id)
  if (blog.userLikes.includes(user.id)) {
    return response.status(400).json({ error: 'You have already liked this blog' })
  }

  const updateData = { ...request.body }
  delete updateData.likes
  delete updateData.userLikes

  const blogWithLikes = await Blog.findByIdAndUpdate(
    request.params.id,
    { ...updateData, $inc: { likes: 1 },
      $push: { userLikes: user.id }
    },
    { new: true, runValidators: true }
  )

  response.json(blogWithLikes)
})

module.exports = blogsRouter