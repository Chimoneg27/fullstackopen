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
  return blogs.find(blog => blog.likes === fav)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}