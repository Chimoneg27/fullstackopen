import { useParams } from "react-router-dom"

const Anecdote = ({anecdotes}) => {
  const id = useParams().id
  const anecdote = anecdotes.find(a => a.id === Number(id))

  return (
    <div>
        <h2>{anecdote.content}</h2>
        <div>{anecdote.author}</div>
        <div>{anecdote.votes}</div>
        <div>{anecdote.info}</div>
    </div>
  )
}

export default Anecdote