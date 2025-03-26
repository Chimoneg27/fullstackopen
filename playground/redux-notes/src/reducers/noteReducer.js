import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    content: 'reducer defines how redux store works',
    important: true,
    id: 1,
  },
  {
    content: 'state of store can contain any data',
    important: false,
    id: 2,
  },
]

const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

const noteSlice = createSlice({
  name: 'notes', // prefix which is used in the action's type values. this will later be notes/createNote
  initialState, // defines the reducers initial state
  reducers: {  //  this parameter takes the reducers itself as an object
    createNote(state, action) {
      const content = action.payload
      state.push({
        content,
        important: false,
        id: generateId(),
      })
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
  }
})// actions can be accessed by the noteSlice.actions property and reducers can be accessed by actions.reducers property

export const { createNote, toggleImportanceOf } = noteSlice.actions
export default noteSlice.reducer;
