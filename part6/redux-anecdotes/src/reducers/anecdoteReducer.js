import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    vote(state, action) {
      const id = action.payload.id
      return state.map(anecdote =>
        anecdote.id === id ? action.payload : anecdote
      )
    }
  },
});


export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteForAnecdote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.castVotes(anecdote)
    dispatch({
      type: 'anecdotes/vote',
      payload: updatedAnecdote
    })
  }
}

export const { appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

export default anecdoteSlice.reducer;
