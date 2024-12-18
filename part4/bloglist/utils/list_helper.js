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

  //Count blogs by author
  const blogCount = _.countBy(blogs, 'author')

  //using maxBy we find the author with the most entries
  const mostAuthorEntries = _.maxBy(Object.entries(blogCount), ([, count]) => count)

  if(!mostAuthorEntries) {
    return null //if author is not found
  }

  //destructuring
  const [author, count] = mostAuthorEntries
  return { author, blogs: count }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}