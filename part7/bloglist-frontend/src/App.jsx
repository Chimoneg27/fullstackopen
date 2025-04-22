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
import { logIn } from './reducers/loginReducer'
import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'
import { initializeUsers } from './reducers/usersReducer'
import BlogPage from './pages/BlogPage'
import Navbar from './components/Navbar'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.login)
  const users = useSelector((state => state.users))
  const blogs = useSelector((state) => state.blogs)

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
                <Navbar />

                <Routes>
                  <Route path='/blogs/:id' element={<BlogPage blogs={blogs} comments={blogs.comments}/>}/>
                  <Route path='/' element={
                    <>
                      <h2>blogs</h2>
                      <Notification type="success" />
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