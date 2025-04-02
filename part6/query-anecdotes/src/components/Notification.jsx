import { useReducer, createContext } from "react"

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

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (true) return null

  return (
    <div style={style}>
      
    </div>
  )
}

export default Notification
