import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'

const BlogPage = ({ blogs }) => {
  const id = useParams().id
  const blog = blogs.find(b => b.id === id)
  const dispatch = useDispatch()

  const addLike = (blog) => {
    dispatch(likeBlog(blog))
  }

  if (!blog) {
    return <p>Blog not found</p>
  }

  return (
    <div className='blog'>
      <div key={blog.id} className='blog'>
        <div>
          <h2>Title: {blog.title}{' '}</h2>
          <a>{blog.url}</a>
          <p>Likes: {blog.likes} <button onClick={() => addLike(blog)}>like</button></p>
          <h2>Added by {blog.author}</h2>
        </div>
      </div>
    </div>
  )
}

export default BlogPage