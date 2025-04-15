import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import { initializeBlogs } from './reducers/blogReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const [user, setUser] = useState(null)
  const [blogFormVisible, setBlogFormVisible] = useState(false)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    const loggedUserJSON = window.localStorage.removeItem('loggedBlogUser')
    if(loggedUserJSON) {
      window.localStorage.removeItem(loggedUserJSON)
      window.localStorage.clear()
    }
  }

  const sortBlogs = (blogsArr) => {
    return blogsArr.sort((a, b) => b.likes - a.likes)
  }

  const hidenWhenVisible = { display: blogFormVisible ? 'none' : '' }
  const showWhenVisible = { display: blogFormVisible ? '' : 'none' }

  return (
    <div>
      {
        user === null?
          <div>
            <Notification
              message={errorMessage}
              type="error"
            />
            <LoginForm
              username={username}
              password={password}
              handleLogin={handleLogin}
              setUsername={setUsername}
              setPassword={setPassword}
            />
          </div>
          :
          <div>
            <h2>blogs</h2>

            <Notification
              type="success"
            />

            <div>
              <h2>{user.name}</h2>
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