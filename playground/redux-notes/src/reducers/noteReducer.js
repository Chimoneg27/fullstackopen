import { createSlice } from "@reduxjs/toolkit";
import noteService from '../services/notes'

const noteSlice = createSlice({
  name: 'notes', // prefix which is used in the action's type values. this will later be notes/createNote
  initialState: [], // defines the reducers initial state
  reducers: {  //  this parameter takes the reducers itself as an object
    toggleImportanceOf(state, action) {
      const id = action.payload
      const noteToChange = state.find(n => n.id === id)
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important
      }
      return state.map(note => note.id !== id ? note : changedNote)
    },
  appendNote(state, action) {
    state.push(action.payload)
  },
  setNotes(state, action) {
    return action.payload
  }
 }
})// actions can be accessed by the noteSlice.actions property and reducers can be accessed by actions.reducers property

export const { toggleImportanceOf, appendNote, setNotes } = noteSlice.actions

export const createNote = content => {
  return async dispatch => {
    const newNote = await noteService.createNew(content)
    dispatch(appendNote(newNote))
  }
}

export const initializeNotes = () => {
  return async dispatch => {
    const notes = await noteService.getAll() // fetches all the notes from the server
    dispatch(setNotes(notes)) // dispatches the setNotes action adding them to the redux store
  }
}

export default noteSlice.reducer;
