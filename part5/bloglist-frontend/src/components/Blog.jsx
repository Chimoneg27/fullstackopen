import { useState } from "react"

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const hidden = { display: visible ? 'none' : '' }
  const show  = { display: visible ? '': 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }



  return(
  <div style={blogStyle}>
    <div style={hidden}>
      <h2>Title: {blog.title} <button onClick={toggleVisibility}>view</button></h2>
    </div>

    <div style={show}>
    <h2>Title: {blog.title} <button onClick={toggleVisibility}>hide</button></h2>
      <h2>Link: {blog.url}</h2>
      <p>Likes: {blog.likes} <button>like</button></p>
      <h2>{blog.author}</h2>
    </div>
  </div>
  ) 
}

export default Blog