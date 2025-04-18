import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import { initializeBlogs } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { logIn, userLogout } from './reducers/loginReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.login)

  const [blogFormVisible, setBlogFormVisible] = useState(false)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(logIn(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const handleLogout = () => {
    dispatch(userLogout())
  }

  const hidenWhenVisible = { display: blogFormVisible ? 'none' : '' }
  const showWhenVisible = { display: blogFormVisible ? '' : 'none' }

  return (
    <div>
      {
        user === null?
          <div>
            <Notification
            />
            <LoginForm
            />
          </div>
          :
          <div>
            <h2>blogs</h2>

            <Notification
              type="success"
            />

            <div>
              <h2>{user.name} logged in</h2>
              <button onClick={handleLogout}>logout</button>
            </div>

            <br />

            <div>
              <div style={hidenWhenVisible}>
                <button onClick={() => setBlogFormVisible(true)}>new blog</button>
              </div>
              <div style={showWhenVisible}>
                <BlogForm />
                <button onClick={() => setBlogFormVisible(false)}>close</button>
              </div>
            </div>

            <br />

            <Blog />
          </div>

      }
    </div>
  )
}

export default App