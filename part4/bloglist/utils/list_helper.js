let _ = require('lodash')

const dummy = (blogs) => {
  return 1 + (blogs.length - blogs.length)
}

const totalLikes = (blogs) => {
  return blogs.length === 0 ?
    0 : blogs.reduce((sum, post) => {
      return sum + post.likes
    }, 0)
}

const favoriteBlog = (blogs) => {
  const justLikes = blogs.map(blog => blog.likes)
  const fav = Math.max(...justLikes)

  const obj = {
    title: blogs.find(blog => blog.likes === fav).title,
    author: blogs.find(blog => blog.likes === fav).author,
    likes: blogs.find(blog => blog.likes === fav).likes
  }
  return obj
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const blogCount = _.countBy(blogs, 'author')
  // Object.entries(blogcount) converts the blogCount obj into an array of [author, blogs, pairs]
  // -.maxBy finds the pair with the maximum count
  // then we manually form the mostAuthor obj
  const mostAuthor = _.maxBy(Object.entries(blogCount), (author, count) => count)
  return { author: mostAuthor[0], blogs: mostAuthor[1] }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}