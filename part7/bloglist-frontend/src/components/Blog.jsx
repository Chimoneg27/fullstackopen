import { useState } from 'react'
import { createNotification, clearNotification } from '../reducers/notificationReducer'
import { likeBlog } from '../reducers/blogReducer'
import Notification from './Notification'
import { useDispatch, useSelector } from 'react-redux'

const Blog = () => {
  const [visible, setVisible] = useState({})
  const blogs = useSelector((state) => state.blogs)
  const dispatch = useDispatch()

  const toggleVisibility = (id) => {
    setVisible((prev) => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const addLike = (blog) => {
    dispatch(likeBlog(blog))
    dispatch(createNotification(`a new blog, ${blog.title}, has been added`))

    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
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
          const isVisible = visible[blog.id] || false
          return (
            <div key={blog.id} style={blogStyle} className='blog'>
              <div  style={{ display: isVisible ? 'none' : '' }}>
                <h2>Title: {blog.title}{' '}
                  <button onClick={() => toggleVisibility(blog.id)}>view</button></h2>
              </div>

              <div style={{ display: isVisible ? '' : 'none' }}>
                <h2>
                  Title: {blog.title}{' '}
                  <button onClick={() => toggleVisibility(blog.id)}>hide</button></h2>
                <h2>Link: {blog.url}</h2>
                <p>Likes: {blog.likes} <button onClick={() => addLike(blog)}>like</button></p>
                <h2>{blog.author}</h2>

                <button>delete</button>
              </div>
            </div>
          )})}
      </div>
    </>
  )
}

export default Blog