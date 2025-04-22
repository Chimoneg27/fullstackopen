import { useDispatch } from 'react-redux'
import { createComment } from '../reducers/blogReducer'
import { useState } from 'react'

const CommentForm = ({ blogId }) => {
  const dispatch = useDispatch()
  const [formVisible, setFormVisible] = useState(false)

  const makeComment = (event) => {
    event.preventDefault()

    const comment = event.target.comment.value

    dispatch(createComment(blogId, comment))

    event.target.reset()
  }

  const hiddenWhenVisible = { display: formVisible ? 'none' : '' }
  const showWhenVisible = { display: formVisible ? '' : 'none' }

  return (
    <>
      <div style={hiddenWhenVisible}>
        <button onClick={() => setFormVisible(true)}>add comment</button>
      </div>

      <div style={showWhenVisible}>
        <form onSubmit={makeComment}>
          <div>
            <input type="text"
              data-testid='comment'
              name='comment'
              id='comment'
              placeholder='Leave a comment'
            />
            <button type='submit'>add comment</button>
          </div>
        </form>
        <button onClick={() => setFormVisible(false)}>close</button>

      </div>
    </>
  )
}

export default CommentForm