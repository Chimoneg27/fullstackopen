import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    logIn (state, action) {
      return action.payload
    },
    logOut () {
      return null
    }
  }
})

export const userLogin = ({ username, password }) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      dispatch(logIn(user))
    } catch (error) {
      return error
    }
  }
}

export const userLogout = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedBlogUser')
    blogService.setToken(null)
    dispatch(logOut())
  }
}

export const { logIn, logOut } = loginSlice.actions
export default loginSlice.reducer