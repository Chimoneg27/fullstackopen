import { createSlice } from "@reduxjs/toolkit";

const noteSlice = createSlice({
  name: 'notes', // prefix which is used in the action's type values. this will later be notes/createNote
  initialState: [], // defines the reducers initial state
  reducers: {  //  this parameter takes the reducers itself as an object
    createNote(state, action) {
      state.push(action.payload)
    },
    toggleImportanceOf(state, action) {
      const id = action.payload
      const noteToChange = state.find(n => n.id === id)
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important
      }
      return state.map(note => note.id !== id ? note : changedNote)
    }
  },
  appendNote(state, action) {
    state.push(action.payload)
  },
  setNotes(state, action) {
    return action.payload
  }
})// actions can be accessed by the noteSlice.actions property and reducers can be accessed by actions.reducers property

export const { createNote, toggleImportanceOf, appendNote, setNotes } = noteSlice.actions
export default noteSlice.reducer;
