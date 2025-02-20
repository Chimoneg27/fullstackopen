import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        <label htmlFor="title">Title</label>
        <input type="text"
          value={newTitle}
          data-testid="title"
          name="title"
          id="title"
          onChange={event => setNewTitle(event.target.value)}
          placeholder='Title'
        />
      </div>
      <div>
        <label htmlFor="author">Author</label>
        <input type="text"
          value={newAuthor}
          data-testid="author"
          name="author"
          id="author"
          onChange={event => setNewAuthor(event.target.value)}
          placeholder='Author'
        />
      </div>
      <div>
        <label htmlFor="url">URL</label>
        <input type="text"
          value={newUrl}
          name="url"
          data-testid="url"
          id="url"
          onChange={event => setNewUrl(event.target.value)}
          placeholder='URL'
        />
      </div>
      <button type="submit">Post blog</button>
    </form>
  )
}

export default BlogForm