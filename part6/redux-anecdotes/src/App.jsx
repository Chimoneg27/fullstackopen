import { useEffect } from 'react'

import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import SearchFilter from './components/SearchFilter'

import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes())
  })

  return (
    <div>
      <SearchFilter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App