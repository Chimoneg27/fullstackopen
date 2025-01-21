const Notification = ({ message, type }) => {
    if (message === null) {
      return null
    }
  
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