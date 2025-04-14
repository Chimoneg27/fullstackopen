import { useSelector } from 'react-redux'

const Notification = ({ message, type }) => {
  const notification = useSelector((state) => state.notification)

  if (!notification) return null

  const classed = type === 'error' ? 'error' : 'blogCreated'

  return (
    <>
      <div className={classed}>
        {message}
      </div>
    </>
  )
}

export default Notification