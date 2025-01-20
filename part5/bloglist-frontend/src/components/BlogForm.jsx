const BlogForm = ({ addBlog, newTitle, setNewTitle, newAuthor, setNewAuthor, newUrl, setNewUrl }) => {
  return (
    <form onSubmit={addBlog}>
      <div>
        <label htmlFor="title">Title</label>
        <input type="text" 
          value={newTitle}
          name="title"
          id="title"
          onChange={({ target }) => setNewTitle(target.value)}
        />
      </div>
      <div>
        <label htmlFor="author">Author</label>
        <input type="text" 
          value={newAuthor}
          name="author"
          id="author"
          onChange={({ target }) => setNewAuthor(target.value)}
        />
      </div>
      <div>
        <label htmlFor="url">URL</label>
        <input type="text"
          value={newUrl}
          name="url"
          id="url"
          onChange={({ target }) => setNewUrl(target.value)}
        />
      </div>
      <button type="submit">Post blog</button>
    </form>
  )
}

export default BlogForm