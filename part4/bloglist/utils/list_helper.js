const dummy = (blogs) => {
  return 1 + (blogs.length - blogs.length)
}

const totalLikes = (blogs) => {
  return blogs.length === 0 ?
    0 : blogs.reduce((sum, post) => {
      return sum + post.likes
    }, 0)
}

module.exports = {
  dummy,
  totalLikes
}