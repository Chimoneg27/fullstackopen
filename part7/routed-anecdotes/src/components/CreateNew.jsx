import { useNavigate } from "react-router-dom"
import { useField } from "../hooks"

const CreateNew = (props) => {
  const {clear: clearContent, ...content} = useField('content')
  const {clear: clearAuthor,...author} = useField('author')
  const {clear: clearInfo,...info} = useField('info')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info,
      votes: 0
    })
    navigate('/')
  }

  const handleClear = (e) => {
    e.preventDefault()
    clearAuthor()
    clearContent()
    clearInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
        <button type="button" onClick={handleClear}>reset</button>
      </form>
    </div>
  )

}

export default CreateNew