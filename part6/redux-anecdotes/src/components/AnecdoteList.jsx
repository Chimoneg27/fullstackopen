import { useDispatch, useSelector } from "react-redux";
import { voteForAnecdote } from "../reducers/anecdoteReducer";
import { createNotification, clearNotification } from "../reducers/notificationReducer";
import Notification from "./Notification";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter)
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(voteForAnecdote(anecdote.id));
    dispatch(createNotification(`You voted for ${anecdote.content}`))

    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };

  const filteredAnecdotes = anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  );

  const sorted = [...filteredAnecdotes].sort((a, b) => b.votes - a.votes)

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      {sorted.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList