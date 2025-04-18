import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { useState } from 'react'

const BlogForm = () => {
  const dispatch = useDispatch()
  const [blogFormVisible, setBlogFormVisible] = useState(false)

  const addBlog = (event) => {
    event.preventDefault()

    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value

    dispatch(createBlog({
      title,
      author,url
    }))

    event.target.reset()
  }

  const hidenWhenVisible = { display: blogFormVisible ? 'none' : '' }
  const showWhenVisible = { display: blogFormVisible ? '' : 'none' }

  return (
    <>
      <div style={hidenWhenVisible}>
        <button onClick={() => setBlogFormVisible(true)}>new blog</button>
      </div>

      <div style={showWhenVisible}>
        <form onSubmit={addBlog}>
          <div>
            <label htmlFor="title">Title</label>
            <input type="text"
              data-testid="title"
              name="title"
              id="title"
              placeholder='Title'
            />
          </div>
          <div>
            <label htmlFor="author">Author</label>
            <input type="text"
              data-testid="author"
              name="author"
              id="author"
              placeholder='Author'
            />
          </div>
          <div>
            <label htmlFor="url">URL</label>
            <input type="text"
              name="url"
              data-testid="url"
              id="url"
              placeholder='URL'
            />
          </div>
          <button type="submit">Post blog</button>
        </form>

        <button onClick={() => setBlogFormVisible(false)}>close</button>
      </div>
    </>
  )
}

export default BlogForm