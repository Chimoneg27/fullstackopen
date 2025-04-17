import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = () => {
  const dispatch = useDispatch()

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

  return (
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
  )
}

export default BlogForm