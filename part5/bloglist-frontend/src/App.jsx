import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [user, setUser] = useState(null) 

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )  
  }, [])

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
      setErrorMessage('Wrong credentials')
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

  const addBlog = (e) => {
    e.preventDefault()

    const blogObj = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    blogService
    .create(blogObj)
    .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
    })
  }

  return (
    <div>
      {
        user === null?
        <LoginForm
        username={username}
        password={password}
        handleLogin={handleLogin}
        setUsername={setUsername}
        setPassword={setPassword}
      /> :
      <div>
        <h2>blogs</h2>

        <div>
          <h2>{user.name}</h2>
          <button onClick={handleLogout}>logout</button>
        </div>

        <br />

        <div>
          <BlogForm 
            addBlog={addBlog}
            setNewAuthor={setNewAuthor}
            setNewTitle={setNewTitle}
            setNewUrl={setNewUrl}
            newUrl={newUrl}
            newTitle={newTitle}
            newAuthor={newAuthor}
          />
        </div>

        <br />
        
        {blogs && blogs.map(blog => {
          return <Blog key={blog.id} blog={blog} />
        })}
      </div>  
      
      }
    </div>
  )
}

export default App