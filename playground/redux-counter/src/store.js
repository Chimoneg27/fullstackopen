// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',  // type
  initialState: 0,  // current or initialState
  reducers: {
    increment: state => state + 1, // if increment add 1
    decrement: state => state - 1, // if decremnt minus 1
    zero: () => 0 // return state to zero
  }
})

export const { increment, decrement, zero } = counterSlice.actions
export const store = configureStore({ reducer: counterSlice.reducer })
