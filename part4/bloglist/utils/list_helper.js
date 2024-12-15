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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}