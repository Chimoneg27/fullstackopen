import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { showNotification } from '../reducers/notificationReducer'

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
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
    appendComment(state, action) {
      return state.push(action.payload)
    }
  }
})

export const createComment = (blogId, comment) => {
  return async dispatch => {
    try {
      const newComment = await blogService.postComment(blogId, { comment })
      dispatch(appendComment(newComment))
    }
    catch (error) {
      return error
    }
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlog(blogs))
  }
}

export const createBlog = content => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(content)
      dispatch(appendBlog(newBlog))
      dispatch(showNotification(`New blog ${content.title} by ${content.author} added`))
    }
    catch (error) {
      dispatch(showNotification('Failed to create blog', 'error'))
    }
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
      dispatch(showNotification(`You liked "${blog.title}"`, 'success'))
    } catch (error) {
      dispatch(showNotification('Failed to like blog', 'error'))
    }
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try{
      await blogService.remove(blog.id)
      dispatch(removeBlog(blog.id))
      dispatch(showNotification(`Successfully deleted ${blog.title}, success`))
    } catch (error) {
      if(error.response?.status === 403) {
        dispatch(showNotification('You can only delete blogs you created'))
      } else {
        dispatch(showNotification('Failed to delete the blog'))
      }
    }
  }
}

export const { appendBlog, setBlog, like, removeBlog, setComments, appendComment } = blogSlice.actions
export default blogSlice.reducer