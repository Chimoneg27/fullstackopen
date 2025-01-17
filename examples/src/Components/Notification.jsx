const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  const classed = message === null || message === '' ? 'noError' : 'error'

  return (
    <div className={classed}>
      {message}
    </div>
  )
}

export default Notification