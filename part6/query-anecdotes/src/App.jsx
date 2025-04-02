import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { voteFor, getAnecdotes } from './requests'
import { useReducer, useContext } from "react"
import notifyContext from './notifyContext'

const notifyReducer = (state, action) => {
  switch (action.type) {
    case 'create':
      return `anecdote '${action.payload}' created `
    case 'vote':
      return `anecdote ${action.payload} was voted for`
    case 'clear':
      return ''
    default:
      return state
  }
}

const App = () => {
  const queryClient = useQueryClient()
  const [notification, notificationDispatch] = useReducer(notifyReducer, '')

  const voteForMutation = useMutation({
    mutationFn: voteFor,
    onSuccess: () => {
      queryClient.invalidateQueries(['anecdotes'])
    }
  })

  const handleVote = (anecdote) => {
    voteForMutation.mutate(
      {...anecdote, votes: anecdote.votes + 1},
      {
        onSuccess: () => {
          notificationDispatch({ type: 'vote', payload: anecdote.content })
          setTimeout(() => notificationDispatch({ type: 'clear' }), 5000)
        }
      }
    )
  }

  const result = useQuery(
    {
      queryKey: ['anecdotes'],
      queryFn: getAnecdotes
    }
  )

  if (result.isLoading) {
    return <div>Loading...</div>
  }
  else if( result.isError ) {
    return <div>anecdote service not available due to problems in the server</div>
  }

  const anecdotes = result.data

  const Display = () => {
    const [notification] = useContext(notifyContext)
    return <div>{notification}</div>
  }

  const Button = ({type, label, func}) => {
    const [notification, dispatch] = useContext(notifyContext)
    return (
      <button onClick={() => {
        dispatch({type});
        func()
        }}>
          vote
        {label}
      </button>
    )
  }

  return (
    <notifyContext.Provider value={[notification, notificationDispatch]}>
    <div>
      <h3>Anecdote app</h3>
      <Display />
      {/* <Notification /> */}
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <Button func={() => handleVote(anecdote)}/>
          </div>
        </div>
      )}
    </div>
    </notifyContext.Provider>
  )
}

export default App
