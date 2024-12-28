const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'This is test one blog',
    author: 'Queresma',
    url: 'trivela@8sound.com',
    likes: 2
  },
  {
    title: 'I am a billionaire',
    author: 'Garvin Chimone',
    url: 'leaveyourmark@now.com',
    likes: 27
  }
]

const nonExistingId = async () => {
  const blog  = new Blog({ title: 'this is a dummy', author: 'meeeee', url: 'feefeeefeee', likes: 99 })
  await blog.save()
  await blog.deleteOne

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = Blog.find({})
  return (await blogs).map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}