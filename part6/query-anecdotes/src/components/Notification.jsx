import { useContext } from "react"
import NotifyContext from "../NotifyContext"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    zindex: 2
  }

  const [notification] = useContext(NotifyContext)

  if(!notification) return null

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
