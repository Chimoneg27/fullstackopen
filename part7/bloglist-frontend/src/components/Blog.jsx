import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import Notification from './Notification'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Blog = () => {
  const blogs = useSelector((state) => state.blogs)
  const dispatch = useDispatch()

  const addLike = (blog) => {
    dispatch(likeBlog(blog))
  }

  const removeBlog = async (blog) => {
    dispatch(deleteBlog(blog))
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
    <>
      <Notification />
      <div className='blog'>
        {blogs.map((blog) => {
          return (
            <div key={blog.id} style={blogStyle} className='blog'>
              <div>
                <h2><Link to={`/blogs/${blog.id}`}>{blog.title}{' '}</Link></h2>
              </div>
            </div>
          )})}
      </div>
    </>
  )
}

export default Blog