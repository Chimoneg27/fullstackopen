import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import { voteFor, getAnecdotes } from './requests'
import Button from './components/Button'
import NotifyContext from './NotifyContext'

const App = () => {
  const queryClient = useQueryClient()
  const [notification, notificationDispatch] = useContext(NotifyContext)

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

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
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
  )
}

export default App
