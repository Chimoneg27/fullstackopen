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

const NotifyContext = createContext()

export const NotifyContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notifyReducer, '')
  return (
    <NotifyContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotifyContext.Provider>
  )
}

export default NotifyContext