import { useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import Users from './components/Users'
import User from './pages/User'
import Notification from './components/Notification'
import { initializeBlogs } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { logIn, userLogout } from './reducers/loginReducer'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import { initializeUsers } from './reducers/usersReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.login)
  const users = useSelector((state => state.users))
  console.log(users)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
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

  const padding = {
    padding: 5
  }

  return (
    <>
      <div>
        {
          user === null?
            <div>
              <Notification />
              <LoginForm />
            </div>
            :
            <div>
              <Router>
                <div>
                  <Link style={padding} to="/blogs">blogs</Link>
                  <Link style={padding} to="/users">users</Link>
                </div>

                <Routes>
                  <Route path='/blogs' element={
                    <>
                      <h2>blogs</h2>

                      <Notification type="success" />

                      <div>
                        <h2>{user.name} logged in</h2>
                        <button onClick={handleLogout}>logout</button>
                      </div>
                      <br />
                      <BlogForm />
                      <br />

                      <Blog />
                    </>
                  } />
                  <Route path='/users/:id' element={<User users={users} />} />
                  <Route path='users' element={<Users />} />
                </Routes>
              </Router>
            </div>
        }
      </div>
    </>
  )
}

export default App