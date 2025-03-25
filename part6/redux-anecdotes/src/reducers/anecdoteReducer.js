const anecdotesAtStart = [

]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = initialState, action) => {

  switch(action.type) {
    case 'VOTE':{
      return state.map(anecdote =>
        anecdote.id === action.payload.id
        ? { ...anecdote, votes: anecdote.votes + 1 }
        : anecdote
      )
    }
    case 'NEW_ANECDOTE':
      return state.concat(action.payload)
    default: return state
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    payload: {
      content,
      id: getId(),
      votes: 0
    }
  }
}

export default anecdoteReducer