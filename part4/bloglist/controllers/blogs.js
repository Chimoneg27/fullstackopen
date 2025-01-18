const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { tokenExtractor } = require('../utils/middleware')
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

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  const blogToUpdate =  await Blog.findByIdAndUpdate(
    request.params.id,
    blog,
    { new: true, runValidators: true }
  )

  if (!blogToUpdate) {
    return response.status(404).json({ error: 'blog not found' })
  }

  response.status(201).json(blogToUpdate)
})

module.exports = blogsRouter