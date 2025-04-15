import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlog(state, action) {
      return action.payload
    },
    like(state, action) {
      const id = action.payload.id
      return state.map(blog =>
        blog.id === id ? action.payload : blog
      )
    }
  }
})

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlog(blogs))
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    try {
      const updatedBlog = await blogService.update(blog.id, {
        title: blog.title,
        author: blog.author,
        url: blog.url,
      })
      dispatch(like(updatedBlog))
    } catch (error) {
      console.log(error)
    }
  }
}

export const { appendBlog, setBlog, like } = blogSlice.actions
export default blogSlice.reducer