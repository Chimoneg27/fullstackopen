import { useState } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_AUTHOR, ALL_AUTHORS, ALL_BOOKS } from "../services/queries";

const EditAuthor = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [changeBorn] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ {query: ALL_BOOKS}, {query: ALL_AUTHORS}  ]
  })

  const submit = (event) => {
    event.preventDefault()

    changeBorn({ variables: {name, born} })

    setBorn('')
    setName('')
  }

  return (
    <div>
      <h2>Set Birthyear</h2>

      <form onSubmit={submit}>
        <div>
          name <input 
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
            born <input
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default EditAuthor